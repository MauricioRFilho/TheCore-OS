import { generateText, streamText, type LanguageModel, type GenerateTextResult } from 'ai'; 
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { CoreConfig } from '../../../core.config';

/**
 * AI Engine - Resilient Provider Wrapper
 * Handles latency-based failover (>3s) and error recovery.
 */

const TIMEOUT_MS = 3000;

const providers = {
  gemini: google(CoreConfig.ai.primary),
  groq: groq(CoreConfig.ai.failover),
};

interface FailoverOptions {
  prompt: string;
  system?: string;
}

export async function generateResilientText({ prompt, system }: FailoverOptions): Promise<GenerateTextResult<any, any>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log(`[AI-ENGINE] Trying Primary: ${CoreConfig.ai.primary}...`);
    const result = await generateText({
      model: providers.gemini as LanguageModel,
      prompt,
      system,
      abortSignal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return result;

  } catch (error: any) {
    clearTimeout(timeoutId);

    // Any error (timeout, 429, 404, etc.) triggers failover for maximum resilience
    console.warn(`[AI-ENGINE] Primary failed (${error.message}). Switching to Failover: ${CoreConfig.ai.failover}...`);
    
    try {
      return await generateText({
        model: providers.groq as LanguageModel,
        prompt,
        system,
      });
    } catch (failoverError: any) {
      console.error("[AI-ENGINE] Failover also failed:", failoverError.message);
      throw new Error(`AI Engine completely failed. Primary: ${error.message}. Failover: ${failoverError.message}`);
    }
  }
}

/**
 * Specialized Streaming with Failover
 * Note: Streaming failover is harder after first bit of data, 
 * this implementation handles "Fail-to-Start" failover.
 */
export async function streamResilientText({ prompt, system }: FailoverOptions) {
  try {
    // Attempt primary with a quick start challenge
    return streamText({
      model: providers.gemini as LanguageModel,
      prompt,
      system,
    });
  } catch (error) {
    console.error("[AI-ENGINE] Stream error, falling back...");
    return streamText({
      model: providers.groq as LanguageModel,
      prompt,
      system,
    });
  }
}

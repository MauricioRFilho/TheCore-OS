import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { CoreConfig } from '../../../core.config.js';
/**
 * AI Engine - Resilient Provider Wrapper
 * Handles latency-based failover (>3s) and error recovery.
 */
const TIMEOUT_MS = 3000;
const providers = {
    gemini: google(CoreConfig.ai.primary),
    groq: groq(CoreConfig.ai.failover),
};
export async function generateResilientText({ prompt, system }) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        console.log(`[AI-ENGINE] Trying Primary: ${CoreConfig.ai.primary}...`);
        const result = await generateText({
            model: providers.gemini,
            prompt,
            system,
            abortSignal: controller.signal,
        });
        clearTimeout(timeoutId);
        return result;
    }
    catch (error) {
        clearTimeout(timeoutId);
        // Any error (timeout, 429, 404, etc.) triggers failover for maximum resilience
        console.warn(`[AI-ENGINE] Primary failed (${error.message}). Switching to Failover: ${CoreConfig.ai.failover}...`);
        try {
            return await generateText({
                model: providers.groq,
                prompt,
                system,
            });
        }
        catch (failoverError) {
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
export async function streamResilientText({ prompt, system }) {
    try {
        // Attempt primary with a quick start challenge
        return streamText({
            model: providers.gemini,
            prompt,
            system,
        });
    }
    catch (error) {
        console.error("[AI-ENGINE] Stream error, falling back...");
        return streamText({
            model: providers.groq,
            prompt,
            system,
        });
    }
}
//# sourceMappingURL=engine.js.map
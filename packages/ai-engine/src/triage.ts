import { generateResilientText } from './engine';
import { z } from 'zod';

const TriageSchema = z.object({
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.string(),
  diagnosis: z.string(),
  recommendation: z.string(),
  suggestedFiles: z.array(z.string()),
});

export type TTriageResult = z.infer<typeof TriageSchema>;

/**
 * Triage Bot - Autonomous Diagnostic Agent
 * Analyzes logs, errors, or architecture snippets to provide surgical insights.
 */
export async function runTriage(context: string): Promise<TTriageResult> {
  console.log("[TRIAGE-BOT] Starting triage...");
  const systemPrompt = `
    You are the TheCore-OS Triage Bot. Your goal is to analyze technical context and provide a surgical diagnosis.
    You MUST respond ONLY with a valid JSON object matching the following schema:
    {
      "severity": "low" | "medium" | "high" | "critical",
      "category": "string",
      "diagnosis": "string",
      "recommendation": "string",
      "suggestedFiles": ["string"]
    }
  `;

  try {
    console.log("[TRIAGE-BOT] Generating text via resilient engine...");
    const { text } = await generateResilientText({
      system: systemPrompt,
      prompt: `Analyze the following context:\n\n${context}`,
    });

    console.log("[TRIAGE-BOT] AI Response received. Parsing JSON...");
    const parsed = JSON.parse(text);
    return TriageSchema.parse(parsed);
  } catch (e: any) {
    console.error("[TRIAGE-BOT] Error in triage:", e.message);
    throw e;
  }
}

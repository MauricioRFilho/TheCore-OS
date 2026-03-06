import { z } from 'zod';
declare const TriageSchema: z.ZodObject<{
    severity: z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
        critical: "critical";
    }>;
    category: z.ZodString;
    diagnosis: z.ZodString;
    recommendation: z.ZodString;
    suggestedFiles: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type TTriageResult = z.infer<typeof TriageSchema>;
/**
 * Triage Bot - Autonomous Diagnostic Agent
 * Analyzes logs, errors, or architecture snippets to provide surgical insights.
 */
export declare function runTriage(context: string): Promise<TTriageResult>;
export {};
//# sourceMappingURL=triage.d.ts.map
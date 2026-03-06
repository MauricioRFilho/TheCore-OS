"use server";

import { runTriage, type TTriageResult } from "@thecore/ai-engine";

export async function processDiagnostic(context: string): Promise<TTriageResult> {
  console.log("[ACTION] Starting diagnostic process with context length:", context?.length);
  if (!context || context.length < 10) {
    throw new Error("Contexto muito curto para análise.");
  }

  try {
    const result = await runTriage(context);
    console.log("[ACTION] Diagnostic successful");
    return result;
  } catch (error: any) {
    console.error("[ACTION-DIAGNOSTIC] Detailed Error:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    throw new Error(`Falha no processamento: ${error.message}`);
  }
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, AlertCircle, CheckCircle2, Loader2, FileCode } from "lucide-react";
import { processDiagnostic } from "@/app/actions";
import type { TTriageResult } from "@thecore/ai-engine";

export function TriageTool() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TTriageResult | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    setErrorCode(null);

    try {
      const data = await processDiagnostic(input);
      setResult(data);
    } catch (err: any) {
      setErrorCode(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-brand-gray/20 border border-brand-gray/50 rounded-sharp overflow-hidden">
      <div className="bg-brand-gray/40 px-4 py-2 border-b border-brand-gray flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-brand-cyan" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Diagnostic_Input_v1.0</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-brand-lime/50" />
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            id="triage-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole o log de erro ou descreva o problema técnico aqui..."
            className="w-full h-32 bg-black/40 border-2 border-brand-gray/30 focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/20 rounded-sharp p-4 font-mono text-sm text-gray-300 resize-none placeholder:text-gray-600 transition-all duration-300 outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute bottom-4 right-4 bg-brand-cyan text-black p-2 rounded-sharp hover:bg-brand-lime transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col items-center gap-2 py-8"
            >
              <Loader2 size={32} className="text-brand-cyan animate-spin" />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-cyan animate-pulse">Consultando Motor de Core...</p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div className={`p-4 border-l-4 ${
                result.severity === 'critical' ? 'border-red-500 bg-red-500/5' :
                result.severity === 'high' ? 'border-orange-500 bg-orange-500/5' :
                'border-brand-lime bg-brand-lime/5'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Severidade: {result.severity}</span>
                  <span className="text-[10px] font-mono text-gray-600">Cat: {result.category}</span>
                </div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <AlertCircle size={16} className="text-brand-lime" />
                  {result.diagnosis}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed italic border-t border-brand-gray/30 pt-2">
                  🚀 {result.recommendation}
                </p>
              </div>

              {result.suggestedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {result.suggestedFiles.map((file: string, i: number) => (
                    <span key={i} className="flex items-center gap-1.5 px-2 py-1 bg-brand-gray/40 border border-brand-gray text-[10px] font-mono text-gray-400 rounded-sharp">
                      <FileCode size={10} />
                      {file}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {errorCode && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono"
            >
              [ERROR_NODE]: {errorCode}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

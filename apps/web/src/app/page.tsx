"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Zap, ArrowRight, ShieldCheck, Code, Globe } from "lucide-react";
import { TriageTool } from "@/components/TriageTool";
import { CoreConfig } from "@thecore/config";

export default function Home() {
  const nameParts = CoreConfig.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'OS';

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-cyan selection:text-brand-black">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section - Asymmetric Tension */}
      <section className="relative z-10 pt-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          
          {/* Left Content (Compressed) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 text-brand-lime font-mono text-sm tracking-widest uppercase">
              <Zap size={16} />
              <span>System Online</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase">
              {firstName}<br />
              <span className="text-brand-cyan">{lastName}</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-sm border-l-2 border-brand-cyan pl-4">
              {CoreConfig.role}. Precisão cirúrgica e escala para o seu ecossistema.
            </p>
            
            <motion.a 
              href="#diagnostico"
              onClick={() => setTimeout(() => document.getElementById('triage-input')?.focus(), 500)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-between border-2 border-brand-cyan text-brand-cyan px-6 py-4 font-bold text-lg rounded-sharp hover:bg-brand-cyan hover:text-black transition-all group shadow-[0_0_20px_rgba(0,245,255,0.2)]"
            >
              Iniciar Diagnóstico
              <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Visual - Geometric Decoration instead of Tool */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full lg:min-h-[400px] relative hidden lg:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-brand-cyan/20 rotate-45 scale-75" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-brand-lime/20 -rotate-12 scale-90" />
            
            {/* Minimalistic Terminal Visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-brand-gray/20 backdrop-blur-xl border border-brand-gray/50 p-6 rounded-sharp font-mono text-[10px] text-brand-cyan/60">
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-lime/30" />
              </div>
              <p>&gt; ACCESS_GRANTED</p>
              <p>&gt; LOADING_CORE_SYSTEMS...</p>
              <p>&gt; READY_FOR_DIAGNOSTIC</p>
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-3 bg-brand-cyan ml-1"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Triage Section - The actual Tool */}
      <section id="diagnostico" className="relative z-10 mt-32 px-6 lg:px-24 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              Motor de <span className="text-brand-cyan">Triagem</span>
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              Análise profunda de arquitetura e debugging via LLM Failover.
            </p>
          </div>
          <TriageTool />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 mt-48 px-6 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              Consultoria<br />
              <span className="text-brand-lime">Assinada</span>
            </h2>
            <p className="text-gray-500 max-w-md text-right font-mono text-xs uppercase tracking-widest">
              Valores baseados em arquitetura de alta complexidade e resposta imediata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(CoreConfig.consulting).map(([key, item]: [string, any]) => (
              <motion.div 
                key={key}
                whileHover={{ y: -5 }}
                className="bg-brand-gray/20 border border-brand-gray/50 p-8 rounded-sharp group hover:border-brand-cyan/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-brand-black border border-brand-gray rounded-sharp group-hover:border-brand-cyan transition-colors">
                    {key === 'quickFix' ? <Code size={24} className="text-brand-cyan" /> : <ShieldCheck size={24} className="text-brand-lime" />}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Duração Est.</div>
                    <div className="font-mono text-brand-cyan">{item.duration}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold uppercase mb-2">
                  {item.label}
                </h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Serviço especializado focado em {key === 'quickFix' ? 'problemas críticos de I/O e bugs operacionais' : 'rebranding técnico e escalabilidade de infraestrutura'}.
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black italic">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(item.price)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="relative z-10 border-t border-brand-gray py-8 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.3em]">
          <span>© 2026 Mauricio | The Architect</span>
          <span>Build: Alpha-01</span>
        </div>
      </footer>
    </main>
  );
}

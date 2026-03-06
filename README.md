# ⚡ TheCore-OS: The Autonomous Consulting Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black?style=flat&logo=next.js)](https://nextjs.org/)
[![AI-Powered](https://img.shields.io/badge/AI-Gemini%20%2B%20Groq-00F5FF)](https://ai.google.dev/)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-CCFF00)](https://web.dev/measure/)

**TheCore-OS** é um framework open-source de alta performance desenvolvido para arquitetos de software e consultores sêniores. Ele automatiza o ciclo de vida da consultoria: desde o diagnóstico técnico inicial via IA até a conversão e gestão de projetos.

> "Construído por quem vive de Vibe Coding para quem busca precisão cirúrgica." — **Mauricio, Creator.**

---

## 💎 Diferenciais Estratégicos

### 🤖 AI Failover Engine (Custo Zero)
O sistema utiliza uma arquitetura de redundância inteligente. 
- **Primário:** Gemini 1.5 Flash para análises densas e contextuais.
- **Backup (Failover):** Groq (Llama 3) para garantir resposta instantânea caso o limite da API principal seja atingido.
- **Triage Bot:** Um agente autônomo que processa logs, identifica bugs e sugere arquiteturas antes da primeira reunião humana.

### 🎨 Stealth Performance Design
Uma interface inspirada na estética de alta performance e esporte de elite.
- **Deep Space UI:** Dark mode nativo com acentos `Electric Cyan` e `Neon Lime`.
- **Core Web Vitals:** Otimizado para máxima velocidade de carregamento e SEO.

### 🛠 Config-Driven Architecture
Totalmente customizável através de um único arquivo `core.config.ts`. Altere sua identidade, preços de consultoria e chaves de IA sem tocar na lógica do core.

---

## 📦 Estrutura do Sistema

- **`packages/ai-engine`**: Motor resiliente com failover por latência. [Ler Docs](packages/ai-engine/README.md)
- **`apps/web`**: Dashboard Next.js (Em desenvolvimento).

## 📚 Documentação Técnica

- **[Arquitetura de IA](.agent/docs/AI_DIAGNOSTICS.md)**: Detalhes sobre o Triage Bot e Failover.
- **[Core Config](core.config.ts)**: Configuração centralizada.

---
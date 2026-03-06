# 🌐 TheCore-OS: The Open Source Consulting Framework

Este projeto foi idealizado pelo desenvolvedor **Mauricio** para ser a base definitiva de qualquer desenvolvedor sênior que deseja automatizar sua consultoria e gerar renda passiva via IA.

---

## 🛠 1. Sistema de Configuração (Core Config)
Para ser Open Source, o sistema não terá valores "hardcoded". Tudo será controlado por um arquivo central `core.config.ts` ou `.yaml`.

### Exemplo do arquivo de configuração:
```typescript
export const CoreConfig = {
  owner: {
    name: "Mauricio",
    specialty: "Fullstack Senior & Software Architect",
    social: {
      instagram: "@seu_insta",
      github: "seu_github"
    }
  },
  design: {
    theme: "stealth-dark", // Opções: stealth-dark, high-performance, minimalist
    primaryColor: "#00F5FF",
    secondaryColor: "#CCFF00"
  },
  ai: {
    strategy: "failover", // failover ou load-balance
    primaryProvider: "GEMINI",
    secondaryProvider: "GROQ_LLAMA",
    enableTriage: true // Habilita o bot de diagnóstico
  },
  services: {
    quickFix: { enabled: true, minPrice: 150 },
    architecture: { enabled: true, minPrice: 1500 }
  }
}

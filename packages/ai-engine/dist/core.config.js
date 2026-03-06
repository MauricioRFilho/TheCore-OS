/**
 * TheCore-OS Configuration
 * This is the central brain of your autonomous consulting framework.
 * Modify these settings to change your identity, pricing, and AI behavior.
 */
export const CoreConfig = {
    name: "Mauricio",
    role: "Senior Fullstack Developer",
    // Consulting Services & Pricing
    consulting: {
        quickFix: {
            label: "Correção Rápida",
            price: 250,
            currency: "BRL",
            duration: "1h",
        },
        architecture: {
            label: "Revisão de Arquitetura",
            price: 2500,
            currency: "BRL",
            duration: "Project-based",
        }
    },
    // AI Failover Engine Settings
    ai: {
        primary: "gemini-1.5-flash-latest",
        failover: "llama-3.1-8b-instant",
        threshold: 0.8, // Load factor to trigger failover
    },
    // UI / Design System Tokens
    design: {
        theme: "deep-space",
        colors: {
            primary: "#00F5FF", // Electric Cyan
            accent: "#CCFF00", // Neon Lime
            background: "#0A0A0A",
        }
    }
};
//# sourceMappingURL=core.config.js.map
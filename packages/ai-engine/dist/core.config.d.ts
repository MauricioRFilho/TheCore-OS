/**
 * TheCore-OS Configuration
 * This is the central brain of your autonomous consulting framework.
 * Modify these settings to change your identity, pricing, and AI behavior.
 */
export declare const CoreConfig: {
    name: string;
    role: string;
    consulting: {
        quickFix: {
            label: string;
            price: number;
            currency: string;
            duration: string;
        };
        architecture: {
            label: string;
            price: number;
            currency: string;
            duration: string;
        };
    };
    ai: {
        primary: string;
        failover: string;
        threshold: number;
    };
    design: {
        theme: string;
        colors: {
            primary: string;
            accent: string;
            background: string;
        };
    };
};
export type TCoreConfig = typeof CoreConfig;
//# sourceMappingURL=core.config.d.ts.map
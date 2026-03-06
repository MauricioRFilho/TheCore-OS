# 🧠 TheCore-OS AI Engine

O `ai-engine` é o núcleo de inteligência do framework **TheCore-OS**, projetado para ser resiliente, performante e agnóstico a provedores.

## 🚀 Funcionalidades Principais

### 🛡️ Latency-Based Failover
O motor implementa uma lógica de **corrida (race)**:
- O modelo **Primário** (Gemini 1.5 Flash) é invocado.
- Se não houver início de resposta em **3 segundos**, o sistema aborta a requisição automaticamente.
- O modelo de **Failover** (Groq Llama 3) é disparado instantaneamente como fallback.

### 🤖 Triage Bot
Um agente autônomo integrado que realiza diagnósticos técnicos cirúrgicos baseados em logs, erros ou trechos de arquitetura.
- **Output:** JSON estruturado via Zod.
- **Categorias:** Diagnóstico, Recomendação, Severidade e Arquivos Sugeridos.

## 🛠️ Arquitetura Técnica

O pacote utiliza o [Vercel AI SDK](https://sdk.vercel.ai/docs) para garantir uma interface unificada entre diferentes LLMs.

### Estrutura de Arquivos
- `src/engine.ts`: Core da lógica de resiliência e failover.
- `src/triage.ts`: Definição e execução do agente de diagnóstico.
- `src/index.ts`: Ponto de entrada e exportação de tipos.

## 💻 Como Usar

### Configuração
As chaves de API devem ser configuradas no seu `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=xxx
NEXT_PUBLIC_GROQ_API_KEY=xxx
```

### Exemplo de Uso (Failover)
```typescript
import { generateResilientText } from '@thecore/ai-engine';

const result = await generateResilientText({
  prompt: "Analise este erro de memória no Node.js",
  system: "Você é um especialista em performance."
});

console.log(result.text); // Se o Gemini demorar >3s, virá da Groq.
```

### Exemplo de Uso (Triage Bot)
```typescript
import { runTriage } from '@thecore/ai-engine';

const context = "Error: Connection refused at port 5432";
const diagnosis = await runTriage(context);

console.log(diagnosis.severity); // 'high'
console.log(diagnosis.recommendation); // 'Check if Postgres is running...'
```

## ✅ Verificação
Execute os testes unitários para validar a lógica de failover:
```bash
cd packages/ai-engine
npm test
```

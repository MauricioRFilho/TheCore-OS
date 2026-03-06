import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateResilientText } from './engine.js';
import * as ai from 'ai';

// Mock the ai module
vi.mock('ai', () => ({
  generateText: vi.fn(),
  streamText: vi.fn(),
}));

// Mock the CoreConfig
vi.mock('../../../core.config', () => ({
  CoreConfig: {
    ai: {
      primary: 'gemini-model',
      failover: 'groq-model',
    },
  },
}));

describe('AI Engine Failover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return primary result if it responds within timeout', async () => {
    (ai.generateText as any).mockResolvedValueOnce({ text: 'Primary Result' });

    const result = await generateResilientText({ prompt: 'Hello' });

    expect(result.text).toBe('Primary Result');
    expect(ai.generateText).toHaveBeenCalledTimes(1);
  });

  it('should fallback to secondary if primary times out', async () => {
    // Primary times out
    (ai.generateText as any).mockImplementationOnce(({ abortSignal }: any) => {
      return new Promise((_, reject) => {
        const timeout = setTimeout(() => reject(new Error('Should have been aborted')), 5000);
        abortSignal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          const abortError = new Error('The operation was aborted');
          abortError.name = 'AbortError';
          reject(abortError);
        });
      });
    });
    
    // Secondary succeeds
    (ai.generateText as any).mockResolvedValueOnce({ text: 'Secondary Result' });

    const result = await generateResilientText({ prompt: 'Hello' });

    expect(result.text).toBe('Secondary Result');
    expect(ai.generateText).toHaveBeenCalledTimes(2);
  });

  it('should fallback to secondary if primary fails with 429', async () => {
    // Primary fails with 429
    const error = new Error('Rate limit exceeded');
    (error as any).status = 429;
    (ai.generateText as any).mockRejectedValueOnce(error);
    
    // Secondary succeeds
    (ai.generateText as any).mockResolvedValueOnce({ text: 'Secondary Result' });

    const result = await generateResilientText({ prompt: 'Hello' });

    expect(result.text).toBe('Secondary Result');
    expect(ai.generateText).toHaveBeenCalledTimes(2);
  });
});

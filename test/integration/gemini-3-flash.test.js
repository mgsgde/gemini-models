#!/usr/bin/env node
/**
 * Integration test: verifies that gemini-3-flash-preview is reachable and returns a response.
 * Requires GEMINI_API_KEY in .env or environment.
 * Run: npm test  or  node --test test/integration/gemini-3-flash.test.js
 */

const path = require('path');
const { describe, it } = require('node:test');
const assert = require('node:assert');

const ROOT = path.resolve(__dirname, '../..');
require('dotenv').config({ path: path.join(ROOT, '.env') });

const MODEL_ID = 'gemini-3-flash-preview';

async function callGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not set (use .env or env)');
  }
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_ID });
  const result = await model.generateContent('Reply with exactly: OK');
  const text = result?.response?.text?.();
  return text;
}

describe('gemini-3-flash-preview', () => {
  it('returns a non-empty response', async () => {
    const text = await callGemini();
    assert.ok(typeof text === 'string', 'response.text should be a string');
    assert.ok(text.length > 0, 'response should not be empty');
  });
});

# cf_ai_interview_coach

An AI-powered mock interview coach built on Cloudflare's Agent platform. Practice software engineering internship interviews with real-time feedback, voice input, and persistent session memory.

## Features

- 🎯 **Mock interview sessions** — AI asks one question at a time, gives structured feedback after each answer
- 🎙️ **Voice input** — speak your answers using the Web Speech API (Chrome recommended)
- 🧠 **Persistent memory** — conversation history is stored via Durable Objects and survives page refreshes
- 📊 **Session summary** — after 5 questions, the AI gives an overall score and improvement advice
- 🔄 **New Session** — reset and start a fresh interview at any time

## Tech Stack

| Component | Technology |
|---|---|
| LLM | Llama 3.3 70B via Cloudflare Workers AI |
| Agent / Memory | Cloudflare Agents SDK + Durable Objects (SQLite) |
| Frontend | React + TypeScript deployed on Cloudflare Pages |
| Voice Input | Web Speech API (browser-native) |
| Workflow | AIChatAgent with persistent message history |

## Running Locally

### Prerequisites
- Node.js 18+
- A Cloudflare account (free tier works)
- Wrangler CLI

### Setup

```bash
git clone https://github.com/WalidMohammadA/cf_ai_interview_coach.git
cd cf_ai_interview_coach/cf-ai-interview-coach
npm install
npx wrangler login
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in Chrome.

### Usage

1. Click one of the suggested prompts or type/speak what role you want to practise
2. Answer each interview question by typing or clicking the 🎙️ microphone button
3. Receive structured feedback after each answer
4. After 5 questions, get an overall session summary
5. Click **New Session** to start over

## Deploying to Cloudflare

```bash
npm run deploy
```

## Project Structure

```
src/
  server.ts   — Cloudflare Agent (LLM logic, Durable Object, session management)
  app.tsx     — React frontend (chat UI, voice input)
  client.tsx  — React entry point
  styles.css  — Global styles
wrangler.jsonc — Cloudflare configuration
```
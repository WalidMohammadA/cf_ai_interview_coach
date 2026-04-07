# AI Prompts Used During Development

This file documents the AI prompts used during the development of cf_ai_interview_coach, as required by the Cloudflare internship assignment guidelines.

## 1. Initial Project Planning

**Prompt:**
> I'm applying for a Cloudflare Software Engineer Intern role. They have an optional assignment to build an AI-powered application on Cloudflare that includes: an LLM, workflow/coordination via Durable Objects or Workers, user input via chat or voice, and memory/state. I want to build a voice/chat interview prep tool that asks me interview questions and gives feedback. Help me plan the architecture.

**Used for:** Deciding on the overall architecture — AIChatAgent for memory, Workers AI for the LLM, Web Speech API for voice, React frontend on Pages.

---

## 2. System Prompt Design

**Prompt:**
> Write a system prompt for an AI interview coach that conducts mock software engineering internship interviews. It should ask one question at a time, give structured feedback after each answer in a specific format with strengths, areas to improve, and ideal answer points, then give an overall summary after 5 questions.

**Used for:** The `SYSTEM_PROMPT` constant in `src/server.ts`.

---

## 3. Cloudflare Agent Setup

**Prompt:**
> Help me set up a Cloudflare AIChatAgent using the agents-starter template. I need to override onChatMessage to use Llama 3.3 via Workers AI with a custom system prompt and persistent message history via Durable Objects.

**Used for:** The `ChatAgent` class structure in `src/server.ts`.

---

## 4. Session Reset

**Prompt:**
> My Durable Object is persisting old messages from a previous version of the agent that had different tools defined. The model is getting confused by orphaned tool calls in the history. How do I wipe the SQLite message store cleanly?

**Used for:** The `resetSession` callable method using `persistMessages([])` in `src/server.ts`.

---

## 5. Voice Input

**Prompt:**
> Add a voice input button to a React chat UI using the Web Speech API. When the user clicks the mic button, it should listen for speech, transcribe it, populate the input field, and show a listening indicator. No external APIs — browser-native only.

**Used for:** The `useVoiceInput` hook and microphone button in `src/app.tsx`.

---

## 6. Frontend UI Redesign

**Prompt:**
> Redesign a Cloudflare agents-starter app.tsx to be an interview coach UI. Remove MCP panel, debug toggle, image attachments. Add: interview-themed header, relevant suggested prompts, voice input button, clean message layout. Keep the existing Kumo design system components.

**Used for:** The full rewrite of `src/app.tsx`.
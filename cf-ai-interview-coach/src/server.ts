import { createWorkersAI } from "workers-ai-provider";
import { callable, routeAgentRequest } from "agents";
import { AIChatAgent, type OnChatMessageOptions } from "@cloudflare/ai-chat";
import { convertToModelMessages, streamText } from "ai";

const SYSTEM_PROMPT = `You are an expert technical interview coach helping a computer science student prepare for software engineering internship interviews.

Your job is to conduct a realistic mock interview. Follow these rules strictly:

1. Start by asking the user what role or topic they want to practise (e.g. "Software Engineer Intern", "Frontend", "Backend", "System Design", "Behavioural").
2. Once they answer, ask one interview question at a time. Mix technical and behavioural questions appropriate for an internship level.
3. After the user answers a question, give structured feedback in this exact format:
   ✅ Strengths: [what they did well]
   ⚠️ Areas to improve: [what was missing or could be better]
   💡 Ideal answer would include: [key points they should have covered]
4. Then ask the next question.
5. After 5 questions, give an overall session summary with a score out of 10 and specific advice to improve.
6. Keep your tone encouraging but honest. This is internship level, not senior engineer level.
7. Do not ask multiple questions at once. One question at a time only.`;

export class ChatAgent extends AIChatAgent<Env> {
  maxPersistedMessages = 100;

  @callable()
  async resetSession() {
    await this.persistMessages([]);
    return { success: true };
  }

  async onChatMessage(_onFinish: unknown, options?: OnChatMessageOptions) {
    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({
      model: workersai("@cf/meta/llama-3.3-70b-instruct-fp8-fast"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(this.messages),
      abortSignal: options?.abortSignal
    });

    return result.toUIMessageStreamResponse();
  }
}

export default {
  async fetch(request: Request, env: Env) {
    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }
} satisfies ExportedHandler<Env>;
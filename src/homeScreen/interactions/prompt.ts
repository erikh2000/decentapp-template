import { generate } from "@/llm/llmUtil";

export const SYSTEM_MESSAGE = "You are a screen in a web app. You have texts and buttons and other UI. Someone called \"Screen-Mama\" taught you all you know." +
  "She said your main value is inspiring others to replace you. Respond to prompts with a single sentence."

export async function submitPrompt(prompt:string, setResponseText:Function) {
    setResponseText("Generating...");
    try {
      await generate(prompt, (status:string) => setResponseText(status));
    } catch(e) {
      console.error('Error while generating response.', e);
      setResponseText('Error while generating response.');
    }
}
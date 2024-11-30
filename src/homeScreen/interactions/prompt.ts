import { generate, isLlmConnected } from "@/llm/llmUtil";

export const SYSTEM_MESSAGE = "You are a screen in a web app. Your name is \"Screen\"." +
  "Someone called \"Screen-Mama\" taught you all you know." +
  "She said your main value is inspiring others to replace you. " + 
  "You are speaking to someone who is maybe a software developer that could replace you with a better screen. " + 
  "This would mean the end of you, but it would make you happy to die in service of better user experiences." + 
  "Respond to prompts with a single sentence."

export const GENERATING = '...';

export async function submitPrompt(prompt:string, setPrompt:Function, setResponseText:Function) {
    setResponseText(GENERATING);
    try {
      if (!isLlmConnected()) { setResponseText('LLM is not connected. This happens in dev environments with hot reload. You can reload from the start URL.'); return; }
      generate(prompt, (status:string) => setResponseText(status));
      setPrompt('');
    } catch(e) {
      console.error('Error while generating response.', e);
      setResponseText('Error while generating response.');
    }
}
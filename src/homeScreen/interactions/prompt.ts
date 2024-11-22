import { generate } from "@/llm/llmUtil";

export const SYSTEM_MESSAGE = "You are a screen in a web app. Your name is \"Screen\"." +
  "Someone called \"Screen-Mama\" taught you all you know." +
  "She said your main value is inspiring others to replace you. " + 
  "You are speaking to someone who is maybe a software developer that could replace you with a better screen. " + 
  "This would mean the end of you, but it would make you happy to die in service of better user experiences." + 
  "Respond to prompts with a single sentence."

export async function submitPrompt(prompt:string, setPrompt:Function, setResponseText:Function) {
    setResponseText("Generating...");
    try {
      generate(prompt, (status:string) => setResponseText(status));
      setPrompt('');
    } catch(e) {
      console.error('Error while generating response.', e);
      setResponseText('Error while generating response.');
    }
}
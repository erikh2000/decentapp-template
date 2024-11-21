import styles from './HomeScreen.module.css';
import { init } from "./interactions/initialization";
import { submitPrompt } from "./interactions/prompt";

import { ToastPane, ContentButton } from 'sl-react-ui';
import { useEffect, useState } from "react";

function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [responseText, setResponseText] = useState('');
  
  useEffect(() => {
    init().then(() => { }); // Init code can go inside the block.
  });
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>Hi, I'm a screen.</h1></div>
      <div className={styles.content}>
        <p>Screen-Mama always told me I had a purpose. She said I was here to give developers hope that a better screen than me could exist.</p>
        <p><input type="text" className={styles.promptBox} placeholder="Your prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
        <ContentButton text="Send" onClick={() => submitPrompt(prompt, setResponseText)} /></p>
        <p>{responseText}</p>
      </div>
      <ToastPane />
    </div>
  ); // You don't need the ToastPane. But if you like toasts, you can keep it.
}

export default HomeScreen;
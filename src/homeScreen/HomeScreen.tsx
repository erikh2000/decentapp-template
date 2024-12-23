import WaitingEllipsis from '@/components/waitingEllipsis/WaitingEllipsis';
import styles from './HomeScreen.module.css';
import eyesPng from './images/eyes.png';
import { init } from "./interactions/initialization";
import { GENERATING, submitPrompt } from "./interactions/prompt";

import ContentButton from '@/components/contentButton/ContentButton';
import { useEffect, useState } from "react";

function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [responseText, setResponseText] = useState('');
  const [eyesState, setEyesState] = useState('');
  
  useEffect(() => {
    init().then(() => { }); // Init code can go inside the block.
  });

  function _onKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === 'Enter' && prompt !== '') submitPrompt(prompt, setPrompt, _onRespond);
  }

  function _onRespond(text:string) {
    setResponseText(text);
    const stateNo = Math.floor(Math.random() * 5) + 1;
    setEyesState(styles[`eyesState${stateNo}`]);
  }

  const response = responseText === GENERATING ? <p>hmmm<WaitingEllipsis/></p> : <p>{responseText}</p>
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>Hi, I'm a screen.</h1></div>
      <div className={styles.content}>
        <img src={eyesPng} alt="Eyes" className={`${styles.eyes} ${eyesState}`}/>
        <p><input type="text" className={styles.promptBox} placeholder="Say anything to this screen" value={prompt} onKeyDown={_onKeyDown} onChange={(e) => setPrompt(e.target.value)}/>
        <ContentButton text="Send" onClick={() => submitPrompt(prompt, setPrompt, _onRespond)} /></p>
        {response}
      </div>
    </div>
  );
}

export default HomeScreen;
import styles from './StartScreen.module.css';
import {isServingLocally} from "@/developer/devEnvUtil.ts";
import {LOAD_URL} from "@/common/urlUtil.ts";

import { useLocation } from "wouter";
import { useEffect } from "react";
import 'sl-react-ui/dist/style.css';

function StartScreen() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isServingLocally()) setLocation(LOAD_URL);
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>A Decent App</h1></div>
      <div className={styles.content}>
        <p>This page adds an extra step before doing the heavy work of loading the LLM, which could otherwise be 
          triggered on each code change. If the web app is deployed to a non-local server, this step will be skipped.</p>
        <button className={styles.startButton} onClick={() => setLocation(LOAD_URL)}>Load</button>
      </div>
    </div>
  );
}

export default StartScreen;
import styles from './LoadScreen.module.css';
import { init } from "./interactions/initialization";
import {HOME_URL} from "@/common/urlUtil.ts";

import 'sl-react-ui/dist/style.css';
import {ProgressBar, ToastPane} from "sl-react-ui";
import {useState, useEffect} from "react";
import {useLocation} from "wouter";

function LoadScreen() {
  const [percentComplete, setPercentComplete] = useState(0);
  const [currentTask, setCurrentTask] = useState('Loading');
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    init(setPercentComplete, setCurrentTask).then((isInitialized) => { if (isInitialized) setLocation(HOME_URL); });
  }, [setPercentComplete, setCurrentTask]);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>Quibley Manor - Loading</h1></div>
      <div className={styles.content}>
        <div className={styles.progressBarContainer}>
          <ProgressBar percentComplete={percentComplete}/>
          {currentTask}
        </div>
      </div>
      <ToastPane />
    </div>
  );
}

export default LoadScreen;
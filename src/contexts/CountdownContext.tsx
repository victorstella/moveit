import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

type CountdownContextData = {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  countdownStart: () => void;
  resetCountdown: () => void;
};

type CountdownProviderProps = {
  children: ReactNode;
};

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider(props: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const notificationAudio = useRef<HTMLAudioElement | null>(null);
  const notificationInterval = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function countdownStart() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(1500);
  }

  useEffect(() => {
    if (hasFinished) {
      if (!notificationAudio.current) {
        notificationAudio.current = new Audio('/notification.mp3');
      }
      notificationAudio.current.play();
      notificationInterval.current = setInterval(() => {
        notificationAudio.current?.play();
      }, 5000);
    } else {
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
        notificationInterval.current = null;
      }
    }
  }, [hasFinished]);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        countdownStart,
        resetCountdown,
      }}
    >
      {props.children}
    </CountdownContext.Provider>
  );
}

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
  alertActive: boolean;
  countdownStart: () => void;
  resetCountdown: () => void;
  stopAlert: () => void;
};

type CountdownProviderProps = {
  children: ReactNode;
};

let countdownInterval: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider(props: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [alertActive, setAlertActive] = useState(false);

  const notificationAudio = useRef<HTMLAudioElement | null>(null);
  const notificationInterval = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function countdownStart() {
    endTimeRef.current = Date.now() + time * 1000;
    setIsActive(true);

    if (!notificationAudio.current) {
      notificationAudio.current = new Audio('/notification.mp3');
    }
    notificationAudio.current
      .play()
      .then(() => {
        notificationAudio.current!.pause();
        notificationAudio.current!.currentTime = 0;
      })
      .catch(() => {});
  }

  function resetCountdown() {
    clearInterval(countdownInterval);
    endTimeRef.current = null;
    setIsActive(false);
    setHasFinished(false);
    setTime(1500);
  }

  function stopAlert() {
    if (notificationInterval.current) {
      clearInterval(notificationInterval.current);
      notificationInterval.current = null;
    }
    notificationAudio.current?.pause();
    if (notificationAudio.current) {
      notificationAudio.current.currentTime = 0;
    }
    setAlertActive(false);
  }

  useEffect(() => {
    if (hasFinished) {
      setAlertActive(true);

      if (!notificationAudio.current) {
        notificationAudio.current = new Audio('/notification.mp3');
      }
      notificationAudio.current.play().catch(() => {});
      notificationInterval.current = setInterval(() => {
        notificationAudio.current?.play().catch(() => {});
      }, 5000);
    } else {
      setAlertActive(false);
      notificationAudio.current?.pause();
      if (notificationAudio.current) {
        notificationAudio.current.currentTime = 0;
      }
      if (notificationInterval.current) {
        clearInterval(notificationInterval.current);
        notificationInterval.current = null;
      }
    }
  }, [hasFinished]);

  useEffect(() => {
    if (!isActive || endTimeRef.current === null) return;

    function tick() {
      const remaining = Math.max(
        0,
        Math.round((endTimeRef.current! - Date.now()) / 1000),
      );
      setTime(remaining);

      if (remaining === 0) {
        clearInterval(countdownInterval);
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
      }
    }

    tick();
    countdownInterval = setInterval(tick, 1000);

    document.addEventListener('visibilitychange', tick);

    return () => {
      clearInterval(countdownInterval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [isActive]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        alertActive,
        countdownStart,
        resetCountdown,
        stopAlert,
      }}
    >
      {props.children}
    </CountdownContext.Provider>
  );
}

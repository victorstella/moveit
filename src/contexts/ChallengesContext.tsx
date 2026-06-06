import { createContext, useState, useEffect, ReactNode } from 'react';
import challenges from '../../challenges.json';
import { GAME_KEY } from './UserContext';

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
};

function getLevelStartXp(level: number) {
  return 16 * (level - 1) * (level + 2);
}

type ChallengesContextData = {
  level: number;
  currentXp: number;
  completedChallenges: number;
  lastXpGain: number;
  activeChallenge: Challenge;
  levelStartXp: number;
  xpToNextLevel: number;
  levelup: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};

type ChallengesProviderProps = {
  children: ReactNode;
};

function getStoredState() {
  try {
    const stored = localStorage.getItem(GAME_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { level: 1, currentXp: 0, completedChallenges: 0 };
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider(props: ChallengesProviderProps) {
  const initial = getStoredState();

  const [level, setLevel] = useState(initial.level);
  const [currentXp, setCurrentXp] = useState(initial.currentXp);
  const [completedChallenges, setCompletedChallenges] = useState(
    initial.completedChallenges,
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [lastXpGain, setLastXpGain] = useState(0);

  const xpToNextLevel = 64 + (level - 1) * 32;
  const levelStartXp = getLevelStartXp(level);

  useEffect(() => {
    localStorage.setItem(
      GAME_KEY,
      JSON.stringify({ level, currentXp, completedChallenges }),
    );
  }, [level, currentXp, completedChallenges]);

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randIndex];

    setActiveChallenge(newChallenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    setLastXpGain(amount);
    let finalXp = currentXp + amount;

    if (finalXp >= xpToNextLevel) {
      levelup();
      finalXp -= xpToNextLevel;
    }

    setCurrentXp(finalXp);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentXp,
        completedChallenges,
        lastXpGain,
        activeChallenge,
        levelStartXp,
        xpToNextLevel,
        levelup,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {props.children}
    </ChallengesContext.Provider>
  );
}

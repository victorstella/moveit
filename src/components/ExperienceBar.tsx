import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
  const { currentXp, levelStartXp, xpToNextLevel } =
    useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentXp * 100) / xpToNextLevel;
  const totalXp = levelStartXp + currentXp;

  return (
    <header className={styles.experienceBar}>
      <span>{levelStartXp} xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        {currentXp > 0 && (
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {totalXp} xp
          </span>
        )}
      </div>
      <span>{levelStartXp + xpToNextLevel} xp</span>
    </header>
  );
}

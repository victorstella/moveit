import { useContext, useEffect, useRef, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useUser } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level, completedChallenges, lastXpGain } =
    useContext(ChallengesContext);
  const { user, logout } = useUser();
  const [showXpGain, setShowXpGain] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setShowXpGain(true);
    const timer = setTimeout(() => setShowXpGain(false), 1200);
    return () => clearTimeout(timer);
  }, [completedChallenges]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.imgWrapper}>
        {showXpGain && <span className={styles.xpGain}>+{lastXpGain}xp</span>}
        <img src={user?.image} alt={user?.name} className={styles.img} />
      </div>
      <div>
        <strong>{user?.name}</strong>
        <p className={styles.level}>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
        <button className={styles.logoutButton} onClick={logout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Profile;

'use client';

import styles from '../styles/components/Signup.module.css';

export function GithubLink() {
  return (
    <button
      type="button"
      className={styles.uploadButton}
      onClick={() =>
        window.open('https://github.com/victorstella/moveit', '_blank')
      }
    >
      GitHub
    </button>
  );
}

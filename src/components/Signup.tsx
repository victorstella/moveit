import { useState, useRef, ChangeEvent } from 'react';
import { createAvatar } from '@dicebear/core';
import { toonHead } from '@dicebear/collection';
import { useUser } from '../contexts/UserContext';
import styles from '../styles/components/Signup.module.css';
import { GithubLink } from './GitHub';

export default function Signup() {
  const { saveUser } = useUser();
  const [name, setName] = useState('');
  const [customImage, setCustomImage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const firstName = name.trim().split(' ')[0];
  const generatedAvatar = firstName
    ? `data:image/svg+xml;utf8,${encodeURIComponent(createAvatar(toonHead, { seed: firstName }).toString())}`
    : '';

  const displayImage = customImage || generatedAvatar;

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (!name.trim()) {
      setError('Enter your name.');
      return;
    }
    saveUser({ name: name.trim(), image: displayImage });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img src="/logo-full.svg" alt="Get.up" className={styles.logo} />
        </div>

        <div className={styles.field}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <div className={styles.field}>
          <label>Profile image</label>
          <div className={styles.uploadRow}>
            <div className={styles.avatarCircle}>
              {displayImage ? (
                <img src={displayImage} alt="avatar" />
              ) : (
                <span>?</span>
              )}
            </div>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className={styles.fileInput}
            />
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Let's go
        </button>
      </div>
      <GithubLink />
    </div>
  );
}

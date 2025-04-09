// components/Typewriter.js
'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Typewriter.module.scss';

export default function Typewriter({ strings }) {
  const [displayText, setDisplayText] = useState('');
  const currentIndex = useRef(0);
  const animationRef = useRef(null);
  const lastTypeTime = useRef(0);
  const isTyping = useRef(true);
  const isPausing = useRef(false);

  // Authentic typewriter timing variables
  const BASE_TYPE_SPEED = 120; // Average typing speed (ms per character)
  const VARIABILITY = 40; // Natural human variation (±ms)
  const LINE_PAUSE = 800; // Pause at end of line (ms)
  const THINK_PAUSE = 1200; // Pause between lines (ms)

  const getRandomTypeSpeed = () => BASE_TYPE_SPEED + (Math.random() * VARIABILITY * 2 - VARIABILITY);

  useEffect(() => {
    const animate = (timestamp) => {
      const currentString = strings[currentIndex.current % strings.length];
      
      if (isPausing.current) {
        if (timestamp - lastTypeTime.current > THINK_PAUSE) {
          isPausing.current = false;
          isTyping.current = false;
          lastTypeTime.current = timestamp;
        }
      } 
      else if (isTyping.current) {
        // Typing forward
        if (displayText.length < currentString.length) {
          if (timestamp - lastTypeTime.current > getRandomTypeSpeed()) {
            setDisplayText(currentString.substring(0, displayText.length + 1));
            lastTypeTime.current = timestamp;
          }
        } else {
          // Finished typing line
          if (timestamp - lastTypeTime.current > LINE_PAUSE) {
            isTyping.current = false;
            lastTypeTime.current = timestamp;
          }
        }
      } else {
        // Deleting text
        if (displayText.length > 0) {
          if (timestamp - lastTypeTime.current > BASE_TYPE_SPEED/1.8) { // Faster backspace
            setDisplayText(displayText.substring(0, displayText.length - 1));
            lastTypeTime.current = timestamp;
          }
        } else {
          // Finished deleting, move to next line
          isPausing.current = true;
          isTyping.current = true;
          currentIndex.current = (currentIndex.current + 1) % strings.length;
          lastTypeTime.current = timestamp;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [displayText, strings]);

  return (
    <span className={`${styles.highlight} ${styles[`gradient${currentIndex.current % 4}`]}`}>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function useRotatingText(phrases, intervalTime = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.fromTo(
        '.animatedText',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
      setIndex((prev) => (prev + 1) % phrases.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [phrases, intervalTime]);

  return phrases[index];
}

'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './MagneticButton.module.scss';

export default function MagneticButton({
  children,
  onClick,
  type = 'button',
  className = '',
  magneticStrength = 0.3
}) {
  const buttonRef = useRef();
  const magneticArea = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (!buttonRef.current || !magneticArea.current) return;

    const button = buttonRef.current;
    const area = magneticArea.current;
    const content = contentRef.current;

    // Set initial transforms
    gsap.set([button, content], { x: 0, y: 0 });

    // Magnetic effect
    const handleMove = (e) => {
      const bounds = area.getBoundingClientRect();
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;
      
      // Button movement
      gsap.to(button, {
        x: x * magneticStrength,
        y: y * magneticStrength,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Content movement (opposite direction)
      gsap.to(content, {
        x: x * -0.1,
        y: y * -0.1,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    const handleLeave = () => {
      // Return to original position with elastic ease
      gsap.to([button, content], {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    area.addEventListener('mousemove', handleMove);
    area.addEventListener('mouseleave', handleLeave);

    return () => {
      area.removeEventListener('mousemove', handleMove);
      area.removeEventListener('mouseleave', handleLeave);
      gsap.killTweensOf([button, content]);
    };
  }, [magneticStrength]);

  return (
    <div 
      className={`${styles.magneticArea} ${className}`} 
      ref={magneticArea}
    >
      <button
        ref={buttonRef}
        type={type}
        className={styles.button}
        onClick={onClick}
      >
        <span ref={contentRef} className={styles.content}>
          {children}
        </span>
        <span className={styles.hoverEffect}></span>
      </button>
    </div>
  );
}
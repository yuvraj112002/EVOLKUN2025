'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedButton.module.scss';

export default function AnimatedButton({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  pulse = false,
  magnetic = false
}) {
  const buttonRef = useRef();
  const magneticArea = useRef();

  // GSAP Animations
  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let ctx = gsap.context(() => {
      // Pulse animation if enabled
      if (pulse) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }
    }, button);

    // Magnetic effect if enabled
    if (magnetic) {
      const handleMove = (e) => {
        const x = e.layerX - (button.clientWidth / 2);
        const y = e.layerY - (button.clientHeight / 2);
        
        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      const handleLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      };

      button.addEventListener('mousemove', handleMove);
      button.addEventListener('mouseleave', handleLeave);

      return () => {
        button.removeEventListener('mousemove', handleMove);
        button.removeEventListener('mouseleave', handleLeave);
        ctx.revert(); // Cleanup GSAP context
      };
    }

    return () => ctx.revert(); // Cleanup GSAP context
  }, [pulse, magnetic]);

  return (
    <div className={`${styles.magneticArea} ${magnetic ? styles.magnetic : ''}`} ref={magneticArea}>
      <button
        ref={buttonRef}
        type={type}
        className={`${styles.button} ${styles[variant]} ${className}`}
        onClick={onClick}
      >
        <span className={styles.content}>{children}</span>
        {variant === 'primary' && (
          <>
            <span className={styles.glow}></span>
            <span className={styles.edge}></span>
          </>
        )}
      </button>
    </div>
  );
}
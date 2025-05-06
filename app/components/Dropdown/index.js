import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Dropdown.module.scss';

export default function Dropdown({ 
  label, 
  options = [], 
  value, 
  onChange, 
  required = false, 
  placeholder = "Select..." // 👈 Add placeholder prop
  }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  // Animate dropdown mount
  useEffect(() => {
    gsap.fromTo(dropdownRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, []);

  // Animate dropdown options reveal
  useEffect(() => {
    if (isOpen && listRef.current) {
      gsap.fromTo(listRef.current.children, 
        { opacity: 0, y: 5 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
  };

  return (
    <div className={styles.customDropdown} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div 
        className={styles.selector} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* 👇 Replace static "Select..." with placeholder */}
        {value || <span className={styles.placeholder}>{placeholder}</span>}
        <span className={styles.arrow}>⌄</span>
      </div>

      {isOpen && (
        <ul className={styles.options} ref={listRef}>
          {options.map((opt, index) => (
            <li 
              key={index} 
              onClick={() => handleSelect(opt)} 
              className={styles.option}
            >
              {opt}
              {index < options.length - 1 && <div className={styles.separator}></div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



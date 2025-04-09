// components/InputField/index.js
import styles from './InputField.module.scss';

export default function InputField({ label, placeholder, value, onChange, required = false }) {
  return (
    <div className={styles.formGroup}>
      {label && <label>{label}</label>}
      <input
        type="text"
        className={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

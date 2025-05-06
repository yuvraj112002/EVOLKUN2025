import styles from './PlanTemplate.module.scss';

export default function PlanTemplate({ tier, price, features }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.tier}>{tier} Plan</h2>
      <p className={styles.price}>{price}</p>
      <ul className={styles.features}>
        {features.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button className={styles.cta}>Continue with this Plan</button>
    </div>
  );
}

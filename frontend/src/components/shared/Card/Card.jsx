import styles from "./Card.module.css";


function Card({ title, Icon, iconProp, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {/* <Hand color="#FFBF00" strokeWidth={1} size={32} /> */}
        {Icon && (<Icon {...iconProp} />)}
        <h2 className={styles.heading}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default Card
import { MoveRight } from "lucide-react";
import styles from "./Button.module.css";

function Button({ btnLabel, handleOnClick }) {
  return (
    <button type="button" className={styles.button} onClick={handleOnClick}>
      <span>{btnLabel}</span>
      <MoveRight />
    </button>
  )
}

export default Button
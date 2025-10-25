import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <input 
    type="text" 
    name="" 
    id=""
    className={styles.input}
    {...props}
     />
  )
}

export default TextInput
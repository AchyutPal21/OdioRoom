import styles from "./StepSetAvatar.module.css";

function StepSetAvatar({onNextStep}) {
  return (
    <>
    <div>StepSetAvatar</div>
    <button type="button" onClick={onNextStep}>Next</button>
    </>
  )
}

export default StepSetAvatar
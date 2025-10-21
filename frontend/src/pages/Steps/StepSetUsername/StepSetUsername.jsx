import styles from "./StepSetUsername.module.css";

function StepSetUsername({onNextStep}) {
  return (
    <>
    <div>StepSetUsername</div>
    <button type="button" onClick={onNextStep}>Next</button>
    </>
  )
}

export default StepSetUsername
import styles from "./StepSetName.module.css";

function StepSetName({onNextStep}) {
  return (
    <>
    <div>StepSetName</div>
    <button type="button" onClick={onNextStep}>Next</button>
    </>
  )
}

export default StepSetName
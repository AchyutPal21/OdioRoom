import styles from "./StepPhoneEmail.module.css";

function StepPhoneEmail({onNextStep}) {
  return (
    <>
    <div>StepPhoneEmail</div>
    <button type="button" onClick={onNextStep}>Next</button>
    </>
  )
}

export default StepPhoneEmail
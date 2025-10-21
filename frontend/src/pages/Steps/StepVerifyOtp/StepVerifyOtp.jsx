import styles from "./StepVerifyOtp.module.css";

function StepVerifyOtp({onNextStep}) {
  return (
    <>
    <div>StepVerifyOtp</div>
    <button type="button" onClick={onNextStep}>Next</button>
    </>
  )
}

export default StepVerifyOtp
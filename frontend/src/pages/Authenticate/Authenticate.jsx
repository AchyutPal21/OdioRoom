import { useState } from "react"
import styles from "./Authenticate.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail"
import StepVerifyOtp from "../Steps/StepVerifyOtp/StepVerifyOtp"
// Registering steps pages
const registerSteps = {
  1: StepPhoneEmail,
  2: StepVerifyOtp,
}

function Authenticate() {
  
  const [step, setStep] = useState(1);
  
  function handleOnClickNextStep() {
    console.log("Entered to authenticate....");
    setStep((prev) => (prev + 1));
  }

  const AuthenticateStep = registerSteps[step];

  return (
    <div>
      <AuthenticateStep onNextStep={handleOnClickNextStep} /> 
    </div>
  )
}

export default Authenticate
import { useState } from "react"
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail"
import StepVerifyOtp from "../Steps/StepVerifyOtp/StepVerifyOtp"

import styles from "./Login.module.css";

// Registering steps pages
const registerSteps = {
  1: StepPhoneEmail,
  2: StepVerifyOtp,
}

function Login() {
  const [step, setStep] = useState(1);
  const handleOnClickNextStep = function() {
    setStep((prev) => prev+1);
  }

  const LoginStep = registerSteps[step];

  return (
    <div>
      <LoginStep onNextStep={handleOnClickNextStep} /> 
    </div>
  )
}

export default Login
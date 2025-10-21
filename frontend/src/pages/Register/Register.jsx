import { useState } from "react"
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail"
import StepSetAvatar from "../Steps/StepSetAvatar/StepSetAvatar"
import StepSetName from "../Steps/StepSetName/StepSetName"
import StepSetUsername from "../Steps/StepSetUsername/StepSetUsername"
import StepVerifyOtp from "../Steps/StepVerifyOtp/StepVerifyOtp"

// Registering steps pages
const registerSteps = {
  1: StepPhoneEmail,
  2: StepVerifyOtp,
  3: StepSetName,
  4: StepSetAvatar,
  5: StepSetUsername
}

function Register() {
  const [step, setStep] = useState(1);
  const handleOnClickNextStep = function() {
    setStep((prev) => prev+1);
  }

  const RegistrationStep = registerSteps[step];

  return (
    <div>
      <RegistrationStep onNextStep={handleOnClickNextStep} /> 
    </div>
  )
}

export default Register
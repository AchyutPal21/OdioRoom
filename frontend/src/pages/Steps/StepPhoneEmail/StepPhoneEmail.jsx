import { useState } from "react";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import { Mail, TabletSmartphone } from "lucide-react";
import styles from "./StepPhoneEmail.module.css";
import PhoneVerification from "./PhoneVerification/PhoneVerification";
import EmailVerification from "./EmailVerification/EmailVerification";
import { AuthAPI } from "../../../api/authApi";
import { setVerifyForm } from "../../../store/slices/authSlice";

const componentTypes = {
  phone: PhoneVerification,
  email: EmailVerification
}

// Component function
function StepPhoneEmail({ onNextStep }) {
  const [verifyType, setVerifyType] = useState("phone");
  const handleOnClickNextStep = function (type) {
    setVerifyType(type);
  };

  const dispatch = useDispatch();



  // handle on submit phone/email form
  async function handleOnInputSubmit(inputDetails = {}) {
    try {
      const payload = {
        recipient: inputDetails.recipient,
        serviceType: inputDetails.serviceType,
        countryCode: inputDetails.countryCode
      };
      toast.success("Sending an otp to your registered address");
      const response = await AuthAPI.sendOtp(payload);
      if (!response.status) {
        return toast.error(response.message);
      }

      // send otp send message
      toast.success(response.message);
      // stor to context
      dispatch(setVerifyForm(payload));
      // redirect to next page
      onNextStep();

    } catch (error) {
      console.log(error.response);
      const message = error.message || "Failed to send otp";
      return toast.error(message);
    }


  }

  const VerifyingComponent = componentTypes[verifyType];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              type="button"
              className={`${styles.tabButton} ${verifyType === "phone" ? styles.active : ""}`}
              onClick={() => handleOnClickNextStep("phone")}
            >
              <TabletSmartphone size={24} />
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${verifyType === "email" ? styles.active : ""}`}
              onClick={() => handleOnClickNextStep("email")}
            >
              <Mail size={24} />
            </button>
          </div>
        </div>
        <VerifyingComponent onSubmitInput={handleOnInputSubmit} />
      </div>
    </>
  )
}

export default StepPhoneEmail
import { useState } from "react";
import styles from "./StepPhoneEmail.module.css";
import PhoneVerification from "./PhoneVerification/PhoneVerification";
import EmailVerification from "./EmailVerification/EmailVerification";
import { Mail, TabletSmartphone } from "lucide-react";

const componentTypes = {
  phone: PhoneVerification,
  email: EmailVerification
}

function StepPhoneEmail({ onNextStep }) {
  const [verifyType, setVerifyType] = useState("phone");
  const handleOnClickNextStep = function (type) {
    setVerifyType(type);
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
        <VerifyingComponent onNextStep={onNextStep} />
      </div>
    </>
  )
}

export default StepPhoneEmail
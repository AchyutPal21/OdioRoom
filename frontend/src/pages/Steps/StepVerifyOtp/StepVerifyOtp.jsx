import { Lock } from "lucide-react";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepVerifyOtp.module.css";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { useState } from "react";
import Button from "../../../components/shared/Button/Button";

function StepVerifyOtp({ onNextStep }) {
  const [secureOtp, setSecureOtp] = useState("");

  function handleOnChange(event) {
    const enteredOtp = event.target.value;
    setSecureOtp(enteredOtp);
  }
  return (

    <>
      <div className={styles.cardWrapper}>
        <Card
          Icon={Lock}
          iconProp={{
            color: "#ffba08",
            strokeWidth: 2,
            size: 32,
          }}
          title="Enter the secret-code number"
        >
          <TextInput
            value={secureOtp}
            onChange={(e) => handleOnChange(e)}
          />
           <p className={styles.bottomParagraph}>
            Don't received otp? Resend otp
          </p>
          <div className={styles.actionButtonWrap}>
            <Button
              btnLabel="Next"
              onNextStep={onNextStep}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepVerifyOtp
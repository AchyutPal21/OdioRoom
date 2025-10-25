import { useState } from "react";
import { Phone } from "lucide-react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import styles from "../StepPhoneEmail.module.css";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const PhoneVerification = ({ onNextStep }) => {

  const [phoneNumber, setPhoneNumber] = useState("");

  function handleOnChangeInput(event) {
    let value = event.target.value;
    value = value.trim();
    setPhoneNumber(value);
  }

  return (
    <Card
      title="Enter you phone number"
      Icon={Phone}
      iconProp={{
        color: "#BE1931",
        strokeWidth: 2,
        size: 32,
      }}
    >
      <TextInput
        value={phoneNumber}
        onChange={(event) => handleOnChangeInput(event)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button
            btnLabel="Next"
            handleOnClick={onNextStep}
          />
        </div>
        <p className={styles.bottomParagraph}>
          By entering you phone number, you're agreeing to out <span>Terms of Services and Privacy Policy</span>.
        </p>
      </div>
    </Card>
  )
}

export default PhoneVerification
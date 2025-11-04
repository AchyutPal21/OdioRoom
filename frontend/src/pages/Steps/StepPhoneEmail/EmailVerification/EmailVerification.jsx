import { useState } from "react";
import { Inbox } from "lucide-react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import styles from "../StepPhoneEmail.module.css";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const EmailVerification = ({ onSubmitInput }) => {

  const [emailId, setEmailId] = useState("");

  function handleOnChangeInput(event) {
    let value = event.target.value;
    value = value.trim();
    setEmailId(value);
  }

  function handleOnSubmit() {
    // server request
    const payload = {
      recipient: emailId,
      serviceType: "email",
      countryCode: ""
    };

    // we can make this to show loading/disable the button
    onSubmitInput(payload);
  }


  return (
    <Card
      title="Enter you email number"
      Icon={Inbox}
      iconProp={{
        color: "#BE1931",
        strokeWidth: 2,
        size: 32,
      }}
    >
      <TextInput
        value={emailId}
        onChange={(event) => handleOnChangeInput(event)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button
            btnLabel="Next"
            handleOnClick={handleOnSubmit}
          />
        </div>
        <p className={styles.bottomParagraph}>
          By entering you email address, you're agreeing to out <span>Terms of Services and Privacy Policy</span>.
        </p>
      </div>
    </Card>
  )
}

export default EmailVerification
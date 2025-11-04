import { Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepVerifyOtp.module.css";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import { AuthAPI } from "../../../api/authApi";
import { setAccessToken, setCredentials } from "../../../store/slices/authSlice";

function StepVerifyOtp({ onNextStep }) {
  const [secureOtp, setSecureOtp] = useState("");
  const authSlice = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleOnChange(event) {
    const enteredOtp = event.target.value;
    setSecureOtp(enteredOtp);
  }

  async function handleOnInputSubmit() {
    const payload = {
      recipient: authSlice.recipient,
      serviceType: authSlice.serviceType,
      otp: secureOtp
    }
    try {
      const response = await AuthAPI.verifyOtp(payload);
      console.log(response);
      if (!response.status) {
        return toast.error(response.message);
      }
      const { user, token: accessToken } = response;
      dispatch(setCredentials({ user, accessToken }));
      toast.success(response.message);
      // onNextStep();
    } catch (error) {
      console.error(error);
      return toast.error(error.message);
    }
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
              handleOnClick={handleOnInputSubmit}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepVerifyOtp
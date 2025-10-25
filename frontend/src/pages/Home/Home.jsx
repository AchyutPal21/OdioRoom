import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import { Hand, MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/shared/Button/Button";

function Home() {
  const navigate = useNavigate();

  const signInLinkStyle = {
    color: "#0077FF",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "0.25rem"
  };

  const startRegister = function() {
    console.log("startRegister...");
    navigate("/authenticate");
  }


  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Welcome to Odio Room!"
        Icon={Hand}
        iconProp={{
          color: "#FFBF00",
          strokeWidth: 1,
          size: 32,
        }}
      >
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Soluta unde repellat beatae laborum iusto dignissimos molestiae
          consequuntur reiciendis iure labore. Unde deserunt quam voluptas
          officiis laudantium accusamus minus at dolor?
        </p>
        <div>
          <Button btnLabel="Let's Go" handleOnClick={startRegister} />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          {/* <Link to={"/login"} style={signInLinkStyle}> Sign in</Link> */}
        </div>
      </Card>
    </div>
  );
}

export default Home;
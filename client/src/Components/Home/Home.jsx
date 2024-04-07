import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>XBlog</div>
      </div>
      <div className={styles.buttonContainer}>
        <input
          className={styles.inputButton}
          type="button"
          onClick={() => navigate('/login')}
          value={"Log in"}
        />

        <input
          className={styles.inputButton}
          type="button"
          onClick={() => navigate('/signup')}
          value={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default Home;

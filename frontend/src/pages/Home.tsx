import Button from "../components/button/Button";
import "./Home.scss";
import { FaDiscord } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <img src={logo} alt="Logo" className="hero-logo" />
        <div className="hero-text">
          <h1>BetterGithub</h1>
          <p>Make your discord github webhooks great again!</p>
          <Button
            text="Login with Discord"
            color="discord"
            LeftIcon={FaDiscord}
            RightIcon={FiChevronRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

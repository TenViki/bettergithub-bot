import Button from "../components/button/Button";
import "./Home.scss";
import { FaDiscord } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-text">
          <h1>BetterGithub</h1>
          <p>Make your discord github webhooks great again!</p>
          <Button
            text="Login with Discord"
            color="discord"
            LeftIcon={FaDiscord}
            RightIcon={FiChevronRight}
            onClick={() =>
              window.location.replace(import.meta.env.VITE_DISCORD_REDIRECT)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

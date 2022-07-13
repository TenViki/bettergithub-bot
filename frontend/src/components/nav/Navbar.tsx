import React, { FC } from "react";
import { useLocation } from "react-router";
import logo from "../../assets/logo.png";
import { DiscordUser } from "../../types/auth";
import "./Navbar.scss";

interface NavbarProps {
  user: DiscordUser | null;
  setUser: (user: DiscordUser | null) => void;
}

const Navbar: FC<NavbarProps> = ({ user, setUser }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="nav-logo-img" />
      </div>
      <div className="nav-links">
        <div className="nav-link">Servers</div>
      </div>

      {user && (
        <div className="nav-user">
          <div className="nav-user-avatar">
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              alt="Avatar"
            />
          </div>
          <div className="nav-user-name">
            {user.username}
            <span>#{user.discriminator}</span>
          </div>
          <div className="nav-link">Log out</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

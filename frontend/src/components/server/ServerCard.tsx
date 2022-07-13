import React, { FC } from "react";
import { FiChevronDown, FiChevronRight, FiUserPlus } from "react-icons/fi";
import { UserGuilds as UserGuild } from "../../types/discord";
import Button from "../button/Button";
import "./ServerCard.scss";

interface ServerCardProps {
  server: UserGuild;
}

const ServerCard: FC<ServerCardProps> = ({ server }) => {
  return (
    <div className="server">
      <div className="server-icon">
        {server.icon ? (
          <img
            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
            alt="Server icon"
          />
        ) : (
          <div>
            <span>{server.name[0]}</span>
          </div>
        )}
      </div>

      <div className="server-name">{server.name}</div>

      <div className="server-action">
        {server.bot ? (
          <Button text="Manage" RightIcon={FiChevronRight} />
        ) : (
          <Button text="Invite" color="grey" />
        )}
      </div>
    </div>
  );
};

export default ServerCard;

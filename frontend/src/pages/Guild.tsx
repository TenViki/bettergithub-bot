import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { getChannels } from "../api/servers";
import Loading from "../components/loading/Loading";
import { UserContext } from "../Router";

const Guild = () => {
  const { user } = React.useContext(UserContext);
  const guildId = useParams().guildId;

  const navigate = useNavigate();

  const { data } = useQuery(
    ["guild", guildId],
    () => getChannels(localStorage.getItem("token")!, guildId!),
    {
      enabled: !!user,
    }
  );

  if (!user) return <div className="error-message">You aren't logged in!</div>;
  if (!data)
    return (
      <div className="loading-text page">
        <Loading size="small" /> Fetching guild info...
      </div>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div className="icon-back" onClick={() => navigate("/servers")}>
          <FiArrowLeft />
        </div>
        <img
          src={`https://cdn.discordapp.com/icons/${data.data.guild.id}/${data.data.guild.icon}.png`}
          alt="Server icon"
          className="server-icon-header"
        />
        <h1>{data.data.guild.name}</h1>
      </div>
    </div>
  );
};

export default Guild;

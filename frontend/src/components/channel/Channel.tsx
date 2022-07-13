import { GuildBasedChannel } from "discord.js";
import React from "react";
import { FiHash, FiLock } from "react-icons/fi";
import Button from "../button/Button";
import "./Channel.scss";

interface ChannelProps {
  channel: GuildBasedChannel & { canSendMessages: boolean; webhook?: string };
  selectedChannel: string;
  onSelect: () => void;
}

const Channel: React.FC<ChannelProps> = ({
  channel,
  onSelect,
  selectedChannel,
}) => {
  const [opened, setOpened] = React.useState(false);

  return (
    <div
      className={`channel ${!channel.canSendMessages ? "locked" : ""} ${
        selectedChannel === channel.id ? "opened" : ""
      }`}
    >
      <div
        className="channel-header"
        onClick={() => channel.canSendMessages && onSelect()}
      >
        <div className="channel-name">
          <FiHash /> {channel.name}
        </div>
        {!channel.canSendMessages && (
          <div className="channel-locked">
            <FiLock /> Bot cannot send messages in this channel
          </div>
        )}
      </div>
      <div className={`channel-content ${opened ? "opened" : ""}`}>
        {channel.webhook ? (
          <div className="channel-webhook"></div>
        ) : (
          <Button text="Create webhook" fullwidth centered />
        )}
      </div>
    </div>
  );
};

export default Channel;

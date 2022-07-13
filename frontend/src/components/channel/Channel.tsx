import { GuildBasedChannel } from "discord.js";
import React from "react";
import { FiHash, FiLock } from "react-icons/fi";
import { useMutation } from "react-query";
import { createWebhook } from "../../api/servers";
import Button from "../button/Button";
import "./Channel.scss";

interface ChannelProps {
  channel: GuildBasedChannel & {
    canSendMessages: boolean;
    webhook?: {
      guild: string;
      channel: string;
      _id: string;
    };
  };
  selectedChannel: string;
  onSelect: () => void;
  guildId: string;
}

const Channel: React.FC<ChannelProps> = ({
  channel,
  onSelect,
  selectedChannel,
  guildId,
}) => {
  const [opened, setOpened] = React.useState(false);

  const { isLoading, mutate } = useMutation(createWebhook, {
    meta: {},
  });

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
          <Button
            text="Create webhook"
            fullwidth
            centered
            onClick={() => {
              mutate({
                guildId: guildId,
                channelId: channel.id,
                token: localStorage.getItem("token")!,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Channel;

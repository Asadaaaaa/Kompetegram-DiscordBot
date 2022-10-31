//Library
import { EmbedBuilder } from "discord.js";

class OnGuildMemberRemove {
  constructor(server, client) {
    client.on("guildMemberRemove", (event) => {
      if(server.data.config.discord.channels.leaveChannel === "") return;
      if(event.user.bot) return;

      const leaveChannel = client.channels.cache.get(server.data.config.discord.channels.leaveChannel);

      const embed = new EmbedBuilder()
        .setTitle(`:man_running: telah meninggal kan server`)
        .setDescription(`Selamat tinggal :wave:`)
        .setColor(`Red`)
        .setAuthor({
            iconURL: event.user.displayAvatarURL(),
            name: event.user.tag
        })
        .setFooter({
            text: client.user.username + " - 2022"
        });

      leaveChannel.send({
        embeds: [embed]
      })
    })
  }
};

export default OnGuildMemberRemove;
import Canvas from "canvas";
import FS from "fs";
import { AttachmentBuilder } from "discord.js";

class OnGuildMemberAdd {
  constructor(server, client) {

    client.on("guildMemberAdd", async (guild) => {
      
      if(server.data.config.discord.channels.welcomeChannel === "") return;
      if(guild.user.bot) return;

      const welcomeChannel = client.channels.cache.get(server.data.config.discord.channels.welcomeChannel);
  
      try {
          welcomeChannel.send({files: [await this.welcomeBanner(guild.user)]});
      } catch (error) {
          console.log(error)
      }
    });
  }

  async welcomeBanner(user) {
    const canvas = Canvas.createCanvas(981, 479)
    const ctx = canvas.getContext("2d")
    
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png" }));
      ctx.drawImage(avatar, (canvas.width/2)-(234/2), (canvas.height/2)-(234/2), 234, 234);
      
      const background = FS.readFileSync("./server_data/assets/WelcomeBanner.png");
      const backgroundImage = new Canvas.Image();
      backgroundImage.src = background;
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      
      let username = ""

      if(user.username.length > 12) {
          username = user.username.substring(0, 12) + "..."
      } else {
          username = user.username
      }

      ctx.fillStyle = "#1E90FF"
      ctx.font = "900 36px Sans"
      ctx.textAlign = "center"
      ctx.fillText(`${username}#${user.discriminator}`.toUpperCase(), canvas.width/2, 410)
      
      return new AttachmentBuilder(canvas.toBuffer("image/png"), { name: "profile-image.png" });
  }
};

export default OnGuildMemberAdd;
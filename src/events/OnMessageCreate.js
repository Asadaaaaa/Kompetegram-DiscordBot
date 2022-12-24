import SendGuide from "../commands/SendGuide.js";
import VerifMenu from "../commands/VerifMenu.js";
import SendMessage from "../commands/SendMessage.js";

class OnMessageCreate {
  constructor(server, client) {
    client.on("messageCreate", (e) => {
      let msgContent =  e.content;

      if(e.author.bot) return;
      if(!msgContent.startsWith(server.data.config.discord.prefix + " ")) return;
      
      let args = msgContent.split(" ");

      switch(args[1]) {
        case "send_guide": {
          new SendGuide(server, client, e);
          break;
        }
        
        case "send_verif_menu": {
          new VerifMenu(server, client, e);
          break;
        }

        case "send_message": {
          new SendMessage(server, client, e);
          break;
        }
      }
    });
  }
};

export default OnMessageCreate;
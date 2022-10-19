import { resourceLoader, getFileData } from "./utils/FileDataHandler.js";
import EventsHandler from "./events/EventsHandler.js";

// Library
import { Client, GatewayIntentBits } from "discord.js";

class Server {

  data = {};
  
  constructor() {
    this.init();

    return;
  }

  async init() {
    this.sendLogs("Starting Bot...")

    await resourceLoader();
    this.data.config = await getFileData("config.yml", "YAML");

    if(this.data.config.discord.token === "") {
      this.sendLogs("Token can't be empty");

      return;
    }
    this.start();

    return;
  }

  start() {
    const client = new Client({
      intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.MessageContent
      ]
    });

    new EventsHandler(this, client);

    client.login(this.data.config.discord.token);

    return;
  }

  sendLogs(text) {
    let date = new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Jakarta'}));
    let currentDate = '[' + date.getDate() + '/' 
        + (date.getMonth()+1)  + '/' 
        + date.getFullYear() + '|'  
        + date.getHours() + ':'  
        + date.getMinutes() + ':' 
        + date.getSeconds() + ']';

    console.log("\n", currentDate + ": " + text);
  }
};

new Server();

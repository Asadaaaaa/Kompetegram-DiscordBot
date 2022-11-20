import { resourceLoader, getFileData } from "./utils/FileDataHandler.js";
import EventsHandler from "./events/EventsHandler.js";
import ModelHandler from "./model/ModelHandler.js";

// Library
import { Client, GatewayIntentBits } from "discord.js";

class Server {
  data = {
    tempVerif: {}
  };
  
  constructor() {
    this.init();
  }

  async init() {
    await resourceLoader();
    this.data.config = await getFileData("config.yml", "YAML");

    if(this.data.config.database.auth === "") {
      this.sendLogs("Database MongoDB Authectication can't be empty");

      return;
    }

    this.sendLogs('Starting Database Connection to MongoDB...');
    this.model = new ModelHandler(this);
    try {
      await this.model.connect(this.data.config.database.auth);
    } catch(err) {
      this.sendLogs("Database Connection Error");
      return;
    }
    this.sendLogs('Database Connected');
    
    this.sendLogs("Starting Bot...")

    if(this.data.config.discord.token === "") {
      this.sendLogs("Token can't be empty");

      return;
    }
    this.start();
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
  }

  sendLogs(text) {
    let date = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    let currentDate = "[" + date.getDate() + "/" 
        + (date.getMonth()+1)  + "/" 
        + date.getFullYear() + "|"  
        + date.getHours() + ":"  
        + date.getMinutes() + ":" 
        + date.getSeconds() + "]";

    console.log("\n", currentDate + ": " + text);
  }
};

new Server();

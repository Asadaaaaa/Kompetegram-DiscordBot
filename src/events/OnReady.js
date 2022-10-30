import MembersCounter from "../services/MembersCounter.js";

class OnBotReady {
  constructor(server, client) {
    client.on("ready", () => {
      server.sendLogs("Kompetegram Bot is Online");

      new MembersCounter(server, client);
    });
  }
};

export default OnBotReady;
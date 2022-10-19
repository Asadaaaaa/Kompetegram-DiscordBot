class OnBotReady {
  constructor(server, client) {
    client.on("ready", () => {
      server.sendLogs("Kompetegram Bot is Online");
    });
  }
};

export default OnBotReady;
class SendMessage {
  
  constructor(server, client, e) {
    this.server = server;
    this.client = client;
    this.e = e;

    this.sendMessage();
  }

  sendMessage() {
    let message = this.e.content.replace(this.server.data.config.discord.prefix + " send_message ", "");

    this.e.delete().catch(err => this.server.sendLogs("Something wrong with SendMessage"));

    this.e.channel.send(message)
  }
};

export default SendMessage;
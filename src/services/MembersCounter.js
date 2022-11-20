class MembersCounter {
  constructor(server, client) {
    this.server = server;
    this.client = client;

    this.updater();
  }

  updater() {
    const guild = this.client
    .guilds
    .cache
    .get(this.server.data.config.discord.guild);
    
    const totalMemberChannels = this.client
    .channels
    .cache
    .get(this.server.data.config.discord.channels.membersCounter);
    
    setInterval(() => {
      const countTotalMembers = guild.memberCount;
      totalMemberChannels.setName("KOMPETEGRAMERS: " + countTotalMembers);
    }, 86400000);
  }
}

export default MembersCounter;
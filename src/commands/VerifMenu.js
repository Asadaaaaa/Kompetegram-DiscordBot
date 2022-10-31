// Library
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

class VerifMenu {
  constructor(server, client, e) {
    this.server = server;
    this.client = client;
    this.e = e;

    if(!server.data.config.developers.includes(e.author.id)) return;

    this.menuForm();
  }

  async menuForm() {
    let menu = await this.e.channel.send('Starting...');
    let menuText = new EmbedBuilder()
    .setTitle(':pencil: Member Verification')
    .setColor('Blue')
    .setDescription(':grey_exclamation:Harap lakukan verifikasi dengan klik tombol "Verification" di bawah dan mengisi form tersebut untuk mendapatkan akses discord KOMPETEGRAM.')
    .setFooter({
      text: this.client.user.username + ' - 2022'
    });

    let menuBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setCustomId('verify')
      .setLabel('Verification')
      .setStyle(ButtonStyle)
      .setDisabled(false)
    );

    menu.edit({
      content: 'Test',
      embeds: [menuText],
      components: [menuBtn]
    });
  }
};

export default VerifMenu;
// Library
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

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
      .setCustomId('verify1')
      .setLabel('Verification')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false)
    );
    
    let textInput = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
      .setCustomId("zkaid")
      .setLabel("input zka:")
      .setMinLength(3)
      .setStyle(TextInputStyle.Short)
    );

    let modal = new ModalBuilder()
    .setCustomId("azkaModal")
    .setTitle("Azka")
    .addComponents(textInput);

    menu.edit({
      content: 'Test',
      embeds: [menuText],
      components: [menuBtn]
    });

    menu.createMessageComponentCollector({
      filter: async (interaction) => {
        interaction.showModal(modal);
        
        // interaction.deferUpdate();
        // this.e.channel.send("konz");
      }
    });
  }
};

export default VerifMenu;
// Library
import { EmbedBuilder } from 'discord.js';

class SendGuide {
  constructor(server, client, e) {
    if(!server.data.config.developers.includes(e.author.id)) return;

    const rulesEmbed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(':warning: Server Rules')
    .setDescription(`
      :scroll: **Berikut adalah peraturan yang harus diikuti:**
      1. Dilarang rasis/sara
      2. Dilarang spam
      3. Dilarang merundung sesama anggota Kompetegram
      4. Gunakan channel dengan benar
      5. Dilarang mengirimkan setiap hal yang memiliki unsur NSFW
      6. Nama harap di sesuaikan dengan nama asli
      **- Peraturan lain bersifat fleksibel -**
    `)
    .setFooter({
      text: client.user.username + ' - 2022'
    });
    
    e.channel.send({
      embeds: [rulesEmbed]
    });
  }
};

export default SendGuide;
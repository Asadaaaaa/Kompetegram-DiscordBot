import VerificationService from '../services/VerificationService.js';

// Library
import { InteractionType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

class OnInteractionCreate {
  constructor(server, client) {
    client.on("interactionCreate", async (e) => {

      if(e.customId === 'verify1') {
        if(server.data.tempVerif[e.user.id]) {
          e.deferUpdate();
          return; 
        }

        this.verificationEmailModdal(e);
      }
      
      if(e.customId === 'verifyCode') {
        this.verificationCodeModal(e);
      }

      if(e.customId === 'verifyModal') {
        if(e.type === InteractionType.ModalSubmit) {
          const emailInput = e.fields.getTextInputValue('userEmail');
          const verificationService = new VerificationService(server);

          server.data.tempVerif[e.user.id] = {
            verifCode: null,
            batch: null,
            eventData: null
          };

          await e.reply({
            content: ':arrows_counterclockwise:  Validasi Email...',
            ephemeral: true
          });
          
          const data = await verificationService.emailCheck(emailInput);
          
          if(data !== null) {
            await e.editReply({
              content: ':arrows_counterclockwise: Mengirim verifikasi code ke email kamu...',
              ephemeral: true
            });

            server.data.tempVerif[e.user.id].batch = data.batch;
            server.data.tempVerif[e.user.id].eventData = e;
            
            const isSent = await verificationService.sendVerifMail(emailInput, `${e.user.username}#${e.user.discriminator}`, e.user.id);
            
            if(isSent) {
              let menuBtn = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('verifyCode')
                .setLabel('Verify Code')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
              );

              await e.editReply({
                content: ':ballot_box_with_check: Kode verifikasi telah dikirim ke email kamu. Jika kamu tidak menerima verifikasi kode nya harap coba lagi dengan tekan tombol "Verify" diatas.',
                components: [menuBtn],
                ephemeral: true
              });
            }
          } else {
            await e.editReply({
              content: ':x: Email tidak ditemukan!, harap coba lagi dengan tekan tombol "Verify" diatas.',
              ephemeral: true
            });

            delete server.data.tempVerif[e.user.id];
          }
        }
      }
      if(e.customId === 'verifCodeModal') {
        if(e.type === InteractionType.ModalSubmit) {
          if(server.data.tempVerif[e.user.id]) {
            if(e.fields.getTextInputValue('verifCodeInput') === server.data.tempVerif[e.user.id].verifCode) {
              e.deferUpdate();
              
              await server.data.tempVerif[e.user.id].eventData.editReply({
                content: `:ballot_box_with_check: Verifikasi Berhasil!, kamu akan mendapatkan roles anggota batch ${server.data.tempVerif[e.user.id].batch} dalam beberapa saat.`,
                ephemeral: true
              });

              switch(server.data.tempVerif[e.user.id].batch) {
                case 1: {
                  const roles = e.guild.roles.cache.find(role => role.id === server.data.config.discord.rolesId.batch1);

                  e.member.roles.add(roles)
                  break;
                }

                case 2: {
                  const roles = e.guild.roles.cache.find(role => role.id === server.data.config.discord.rolesId.batch2);

                  e.member.roles.add(roles)
                  break;
                }
                
                case 3: {
                  const roles = e.guild.roles.cache.find(role => role.id === server.data.config.discord.rolesId.batch3);

                  e.member.roles.add(roles)
                  break;
                }
              }

              delete server.data.tempVerif[e.user.id];
            } else {
              e.deferUpdate();

              await server.data.tempVerif[e.user.id].eventData.editReply({
                content: `:x: Verifikasi Gagal!, kode yang kamu input salah harap coba lagi.`,
                ephemeral: true
              });
            }
          }
        }
      }
    })
  }

  verificationEmailModdal(e) {
    let textInput = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
      .setCustomId("userEmail")
      .setLabel("Enter your registered email:")
      .setMinLength(3)
      .setStyle(TextInputStyle.Short)
      .setMinLength(8)
      .setMaxLength(40)
      .setPlaceholder('johndoe@upi.edu')
    );

    let modal = new ModalBuilder()
    .setCustomId("verifyModal")
    .setTitle("Verify your email")
    .addComponents(textInput);

    e.showModal(modal);
  }

  verificationCodeModal(e) {
    let textInput = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
      .setCustomId("verifCodeInput")
      .setLabel("Enter your verification code:")
      .setMinLength(3)
      .setStyle(TextInputStyle.Short)
      .setMinLength(6)
      .setMaxLength(6)
      .setPlaceholder('aBcDEf')
    );

    let modal = new ModalBuilder()
    .setCustomId("verifCodeModal")
    .setTitle("Verification Code")
    .addComponents(textInput);

    e.showModal(modal);
  }
};

export default OnInteractionCreate;
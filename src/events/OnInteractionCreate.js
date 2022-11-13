import { InteractionType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js'

class OnInteractionCreate {
  constructor(server, client) {
    client.on("interactionCreate", (e) => {
      if(e.customId === 'verify1') {
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
      if(e.customId === 'verifyModal') {
        if(e.type === InteractionType.ModalSubmit) {
          const emailInput = e.fields.getTextInputValue('userEmail')
          
          console.log(emailInput)
        }
        e.deferUpdate()
      }
    })
  }
};

export default OnInteractionCreate;
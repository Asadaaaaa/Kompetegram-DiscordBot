class OnInteractionCreate {
  constructor(server, client) {
    client.on("interactionCreate", (e) => {
      // console.log(e)
    })
  }
};

export default OnInteractionCreate;
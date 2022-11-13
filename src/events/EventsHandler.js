import OnBotReady from "./OnReady.js";
import OnGuildMemberAdd from "./OnGuildMemberAdd.js";
import OnGuildMemberRemove from "./OnGuildMemberRemove.js";
import OnMessageCreate from "./OnMessageCreate.js";
import OnInteractionCreate from "./OnInteractionCreate.js";

class EventsHandler {
  constructor(server, client) {
    new OnBotReady(server, client);
    new OnGuildMemberAdd(server, client);
    new OnGuildMemberRemove(server, client);
    new OnMessageCreate(server, client);
    new OnInteractionCreate(server, client);
  }
}

export default EventsHandler;
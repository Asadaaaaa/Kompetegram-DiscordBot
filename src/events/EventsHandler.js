import OnBotReady from "./OnReady.js";
import OnGuildMemberAdd from "./OnGuildMemberAdd.js";
import OnGuildMemberRemove from "./OnGuildMemberRemove.js";
import OnMessageCreate from "./OnMessageCreate.js";

class EventsHandler {
  constructor(server, client) {
    new OnBotReady(server, client);
    new OnGuildMemberAdd(server, client);
    new OnGuildMemberRemove(server, client);
    new OnMessageCreate(server, client);
  }
}

export default EventsHandler;
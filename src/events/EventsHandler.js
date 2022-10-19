import OnBotReady from "./OnReady.js";
import OnGuildMemberAdd from "./OnGuildMemberAdd.js";

class EventsHandler {
  constructor(server, client) {
    new OnBotReady(server, client);
    new OnGuildMemberAdd(server, client);
    
    return;
  }
}

export default EventsHandler;
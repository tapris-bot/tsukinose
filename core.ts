import { Client, Collection, GatewayIntents } from "harmony";
import { serve } from "std/http/server.ts";
import { Command, Component, Event } from "@types/mod.ts";
import GetCommands from "@commands/mod.ts";
import GetEvents from "@events/mod.ts";
import GetComponents from "@components/mod.ts";
import env from "@utils/config.ts";
import server from "@utils/server.ts";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public components: Collection<RegExp, Component> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public env = env;

  public async init() {
    await this.connect(this.env.BOT_TOKEN, [
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILDS,
      GatewayIntents.GUILD_MESSAGES,
    ]);

    GetCommands(this);
    GetEvents(this);
    GetComponents(this);

    await serve(server, { port: Number(env.SERVER_PORT) });
  }
}

export default ExtendedClient;

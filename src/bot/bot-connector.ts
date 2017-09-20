import {ChatConnector} from "botbuilder";

export function createConnector(appId: string, appPassword: string): ChatConnector {
  return new ChatConnector({appId, appPassword});
}

export function createMainConnector(): ChatConnector {
  return createConnector("9b62c71f-1af3-42a7-afd3-97da6768a00c",
    "0MTXpGxEiX5vz6qSbEmLDCh"
  );
}

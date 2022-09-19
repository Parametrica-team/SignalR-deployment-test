import * as signalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export default function useConnection(){
  const initialConnection: HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:49153/hub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()

  const [connection, setConnection] = useState<HubConnection | null>(null)

  useEffect(() => {
    async function start(): Promise<void> {
      if (initialConnection.state === signalR.HubConnectionState.Disconnected) {
        await initialConnection.start();
        setConnection(initialConnection);
      }
    }
    start()
  }, [])

  return connection
}
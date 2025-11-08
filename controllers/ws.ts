import WebSocket from "ws";
import { redis_client } from "../exports/redis_client";

const url =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade";

async function connect() {
  try {
    await redis_client.connect();
    console.log("Connected To Redis Client");
  } catch (error) {
    console.log("Redis Connection Failed: ", error);
  }
  const wss = new WebSocket(url);
  wss.on("open", () => {
    console.log("WS Connection Established");
  });
  wss.on("message", (event: any) => {
    const data = event.data || event;
    const trades = JSON.parse(data.toString()).data;
    if (trades.e === "trade") {
      const tradesData = {
        symbol: String(trades.s),
        price: Number(trades.p),
        quantity: Number(trades.q),
      };
      console.log(tradesData);
      redis_client.publish("trades", JSON.stringify(tradesData));
    } else {
      console.log("Unknown Error: ", trades);
    }
  });
  wss.on("error", (error) => {
    console.log("WebSocket Connection Error: ", error);
  });
  wss.on("close", () => {
    console.log("WebSocket Connection Closed");
  });
}

connect();

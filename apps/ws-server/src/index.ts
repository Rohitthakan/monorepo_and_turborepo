import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";

const port = Number(process.env.PORT) || 3002;

const server = new WebSocketServer({ port });

server.on("listening", () => {
  console.log(`WebSocket server listening on ws://localhost:${port}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Stop the other process or set PORT to a different value.`
    );
    process.exit(1);
  }
  throw err;
});

server.on("connection", async (socket: WebSocket) => {
  try {
    const user = await client.user.create({
      data: {
        username: Math.random().toString(),
        passwrod: Math.random().toString(),
      },
    });
    console.log("Created user:", user.id);
    socket.send("Hi there you are connected to the server");
  } catch (err) {
    console.error("Database error:", err);
    socket.send("Connected, but could not save user. Check server logs.");
  }
});
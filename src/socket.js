import { io } from "socket.io-client";
import { SOCKET_ENDPOINT } from "./config/env.js";

let socketInstance = null;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = io(
      SOCKET_ENDPOINT, { 
        query: {
          client: localStorage.getItem('yootGame')
        },
        autoConnect: false,
      },
    );
  }
  return socketInstance;
}

export function connectSocket() {
  const socket = getSocket();
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
}

export function disconnectSocket() {
  if (socketInstance && socketInstance.connected) {
    socketInstance.disconnect();
  }
}

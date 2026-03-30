import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
    if (!socket) {
        socket = io(import.meta.env.VITE_SERVER_URL, {
            query: { userId },
            withCredentials: true,
        });
    }
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
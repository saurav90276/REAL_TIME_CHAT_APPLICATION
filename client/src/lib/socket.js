import {io} from "socket.io-client";

let socket = null;

export const connectSocket = (userId) =>{
    // socket = io(
    //     import.meta.env.MODE === "development" ? "http://localhost:4000": "/" ,
    //     {
    //         query: {userId},
    //     }

    // );
    const socket = io(import.meta.env.VITE_SERVER_URL);
    return socket;
}

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
        socket=null;
    }
}
import { WsHandler } from "../../types";

export const authMiddleware: WsHandler = (socket, next) => {
    // TODO: implement auth middleware, check token is valid signed jwt
    if(socket.handshake.auth.token === 'secret') {
        next();
    } else {
        next(new Error('unauthenticated'))
    }
}

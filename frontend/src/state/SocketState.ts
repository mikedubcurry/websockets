import { makeAutoObservable } from 'mobx'

import {Socket} from 'socket.io-client'
import { createContext, useContext } from 'react';

export class SocketState {
    public socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;

        makeAutoObservable(this);
    }


    setSocket(socket: Socket) {
        this.socket = socket
    }

}

export const SocketsStateContext = createContext<SocketState | null>(null);

export const SocketsStateProvider = SocketsStateContext.Provider;

export const useSocketsState = () => {
    const socketsState = useContext(SocketsStateContext);
    if (!socketsState) {
        throw Error("useSocketsState must be called within SocketsStateProvider!!!")
    }
    return socketsState
}



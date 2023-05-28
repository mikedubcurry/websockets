import { makeAutoObservable } from 'mobx'

import { createContext, useContext } from 'react';
import { SocketState } from './SocketState';

export class RoomState {
    public rooms: string[];
    public socketState: SocketState

    constructor(socketState: SocketState) {
        this.socketState = socketState
        this.rooms = [];

        makeAutoObservable(this);
    }


    setRooms(rooms: string[]) {
        console.log("setRooms", {rooms})
        this.rooms = rooms
    }

    createRoom(room: string) {
        // dispatch create room on socket
        this.socketState.socket.emit('join_room', room, (rooms: string[]) => {
            console.log(rooms)
            this.setRooms([...rooms.filter(r => r !== this.socketState.socket.id),])
        })
        // get all rooms
    }
}

export const RoomsStateContext = createContext<RoomState | null>(null);

export const RoomsStateProvider = RoomsStateContext.Provider;

export const useRoomsState = () => {
    const roomsState = useContext(RoomsStateContext);
    if (!roomsState) {
        throw Error("useRoomsState must be called within RoomsStateProvider!!!")
    }
    return roomsState
}


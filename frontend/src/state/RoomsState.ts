import { makeAutoObservable } from 'mobx'

import { Room } from '../types'
import { createContext, useContext } from 'react';

export class RoomState {
    public rooms: Room[];

    constructor(rooms: Room[] = []) {
        this.rooms = rooms;

        makeAutoObservable(this);
    }


    setRooms(rooms: Room[]) {
        this.rooms = [...rooms,]
    }

    createRoom(room: Room) {
        // dispatch create room on socket
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


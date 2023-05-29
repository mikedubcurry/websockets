export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    sender: User;
    room: Room;
    deleted: boolean;
}

export type Room = {
    id: string
    name: string
    members: number
    owner: User;
}

export type User = {
    id: string
    username: string
    friends?: User[]
    blocks?: User[]
}

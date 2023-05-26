export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    sender: string;
    room: string;
    deleted: boolean;
}

export type Room = {
    id: string
    name: string
    members: number
}

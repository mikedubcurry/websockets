export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    sender: string;
    room: string;
    deleted: boolean;
}

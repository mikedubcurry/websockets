export type User = {
    id: number
    username: string
    friends?: User[]
    blocks?: User[]
}

export type Room = {
    id: number
    name: string
    members: number
    owner: User;
}

export type Message = {
    id: number
    text: string
    sender: User
    deleted: boolean
}

export type SocketData = {
    username: string
    userId: number
}

import { makeAutoObservable } from 'mobx'

import { Message } from '../types'
import { createContext, useContext } from 'react';
import { SocketState } from './SocketState';

export class ChatState {
    public messages: Message[];
    public newMessage: Message;
    public socketState: SocketState;

    constructor(socketState: SocketState) {
        this.socketState = socketState
        this.messages = [];
        this.newMessage = {
            sender: 'Mike',
            text: '',
            createdAt: new Date(),
            id: Math.random().toString(36).slice(2, 9),
            deleted: false,
            room: 'test'
        };

        makeAutoObservable(this);
    }

    setNewMessage(value: string) {
        this.newMessage = {
            ...this.newMessage,
            text: value,
            createdAt: new Date(),
            id: Math.random().toString(36).slice(2, 9),
        }
    }

    sendMessage() {
        this.socketState.socket.emit('new_chat', this.newMessage.text, this.newMessage.room)
        this.messages = [...this.messages, this.newMessage]
        this.newMessage = {
            sender: 'Mike',
            text: '',
            createdAt: new Date(),
            id: Math.random().toString(36).slice(2, 9),
            deleted: false,
            room: 'test'
        };
    }

    onMessage(message: string) {
        console.log('new message')
        const messageData = JSON.parse(message) as Message;
        this.messages = [...this.messages, { id: Math.random().toString(36).slice(2, 9), text: messageData.text, createdAt: new Date(messageData.createdAt), room: messageData.room, sender: messageData.sender, deleted: false }]
    }
}

export const ChatStateContext = createContext<ChatState | null>(null);

export const ChatStateProvider = ChatStateContext.Provider;

export const useChatState = () => {
    const chatState = useContext(ChatStateContext);
    if (!chatState) {
        throw Error("useChatState must be called within ChatStateProvider!!!")
    }
    return chatState
}

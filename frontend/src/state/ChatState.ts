import { makeAutoObservable } from 'mobx'

import { Message } from '../types'
import { createContext, useContext } from 'react';

export class ChatState {
    public messages: Message[];
    public newMessage: Message;

    constructor(messages: Message[] = []) {
        this.messages = messages;
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
}

export const ChatStateContext = createContext<ChatState | null>(null);

export const ChatStateProvider = ChatStateContext.Provider;

export const useChatState: ChatState = () => {
    const chatState = useContext(ChatStateContext);
    if(!chatState) {
        throw Error("useChatState must be called within ChatStateProvider!!!")
    }
    return chatState
}

import { useState } from "react"
import { ChatInput } from "./ChatInput"
import { MessageList } from "./MessageList"
import type { Message } from "../types"

export const ChatRoom = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const handleNewMessage = (message: Message) => {
        setMessages([...messages, message])
    }

    return (
        <div className='flex flex-col gap-4 p-8'>
            <MessageList messages={messages} followAtBottom />
            <ChatInput handleNewMessage={handleNewMessage} />
        </div>

    )
}

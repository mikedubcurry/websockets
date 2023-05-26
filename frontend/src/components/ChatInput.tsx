import { useState } from "react"
import { Message } from "../types"

export type ChatInputProps = {
    handleNewMessage: (message: Message) => void
}
export const ChatInput = ({ handleNewMessage }: ChatInputProps) => {
    const [message, setMessage] = useState<Message>({
        sender: 'Mike',
        text: '',
        createdAt: new Date(),
        id: Math.random().toString(36).slice(2, 9),
        deleted: false,
        room: 'test'

    })
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleNewMessage(message)
            setMessage({ ...message, text: '' })
        }} className='flex gap-4'>
            <input className='border border-gray-400 rounded-lg p-2 w-full' type="text" placeholder='Enter a message...' value={message.text} onChange={e => {
                setMessage({ ...message, text: e.target.value, createdAt: new Date(), id: Math.random().toString(36).slice(2, 9) })
            }} />
            <button className='bg-blue-500 text-white rounded-lg p-2'>Send</button>
        </form>
    )
}

import { useEffect, useRef } from 'react'
import type { Message } from '../types'
export type MessageListProps = {
    messages: Message[]
    followAtBottom?: boolean
}
export const MessageList = ({ messages, followAtBottom }: MessageListProps) => {

    const bottomRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (followAtBottom && bottomRef.current) {
            bottomRef.current.scrollTo()
        }
    }, [])
    return (
        <div className='flex flex-col gap-4 items-start'>
            {messages.map((message, index) => (
                <div key={index} className='flex flex-col gap-1'>
                    <span className='font-bold'>{message.sender}</span>
                    <span className='text-gray-400 text-sm'>{message.createdAt.toLocaleString()}</span>
                    <span>{message.text}</span>
                </div>
            ))}
            <span ref={bottomRef} />
        </div>
    )
}

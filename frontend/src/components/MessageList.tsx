import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { useChatState } from '../state/ChatState'

export type MessageListProps = {
    followAtBottom?: boolean
}

export const MessageList = observer(({ followAtBottom }: MessageListProps) => {
    const bottomRef = useRef<HTMLSpanElement>(null);
    const chatState = useChatState();

    useEffect(() => {
        if (followAtBottom && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [followAtBottom, chatState.messages])

    return (
        <div className='flex flex-col gap-4 items-start'>
            {chatState.messages.map((message, index) => (
                <div key={index} className='flex flex-col gap-1'>
                    <span className='font-bold'>{message.sender}</span>
                    <span className='text-gray-400 text-sm'>{message.createdAt.toLocaleString()}</span>
                    <span>{message.text}</span>
                </div>
            ))}
            <span ref={bottomRef} >&nbsp;</span>
        </div>
    )
})

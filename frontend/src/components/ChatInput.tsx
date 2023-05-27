import { observer } from "mobx-react"

import { useChatState } from "../state/ChatState"

export const ChatInput = observer(() => {
    const chatState = useChatState();

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            chatState.sendMessage();
        }} className='flex gap-4 bg-gray-600 p-8'>
            <input
                autoFocus
                className='border border-gray-400 rounded-lg p-2 w-full'
                type="text"
                placeholder='Enter a message...'
                value={chatState.newMessage.text}
                onChange={e => {
                    chatState.setNewMessage(e.target.value)
                }} />
            <button className='bg-blue-500 text-white rounded-lg p-2'>Send</button>
        </form>
    )
})

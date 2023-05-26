import reactLogo from './assets/react.svg'
import socketLogo from './assets/socket.svg'
import typescriptLogo from './assets/ts.svg'
import { MessageList } from './components/MessageList'
import { ChatInput } from './components/ChatInput'
import { Message } from './types'
import { useState } from 'react'

function App() {
    const [messages, setMessages] = useState<Message[]>([])
    const handleNewMessage = (message: Message) => {
        setMessages([...messages, message])
    }
    return (
        <main>
            <div className='bg-gray-500 p-8 flex flex-col items-center gap-4'>
                <h1 className='text-4xl'>Chat App</h1>
                <p className='font-serif font-bold'>Chat app using React, Typescript, and Socket.io</p>
                <div className='flex gap-4'>
                    <img width={30} src={reactLogo} alt="React Logo" />
                    <img width={30} src={typescriptLogo} alt="Typescript Logo" />
                    <img width={30} src={socketLogo} alt="Socket.io Logo" />
                </div>
            </div>
            <div className='flex flex-col gap-4 p-8'>
                <MessageList messages={messages} />
                <ChatInput handleNewMessage={handleNewMessage}/>
            </div>
        </main>
    )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import socketLogo from './assets/socket.svg'
import typescriptLogo from './assets/ts.svg'

import { ChatRoom } from './components/ChatRoom'
import { RoomSelector } from './components/RoomSelector'
import { Room } from './types'

function App() {
    const [currentRoom, setRoom] = useState<Room | null>(null);
    const rooms: Room[] = [
        { id: '123abc', name: 'chill', members: 4 },
        { id: '867xyz', name: 'tech', members: 0 },
        { id: '1213fc', name: 'general', members: 69 }
    ]
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

            {currentRoom ? (
                <>
                    <div className='p-8 flex justify-between gap-4'>
                        <span className='text-2xl'>Room: {currentRoom.name}</span>
                        <button className='bg-white text-black rounded hover:text-blue-800 w-24' onClick={() => setRoom(null)}>Exit</button>
                    </div>
                    <ChatRoom />
                </>
            ) :
                (
                    <RoomSelector rooms={rooms} onRoomSelect={room => setRoom(room)} />

                )
            }
        </main>
    )
}

export default App

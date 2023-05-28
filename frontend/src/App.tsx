import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import socketLogo from './assets/socket.svg'
import typescriptLogo from './assets/ts.svg'

import { socket } from './socket'

import { ChatRoom } from './components/ChatRoom'
import { RoomSelector } from './components/RoomSelector'
import { RoomModal } from './components/RoomModal'
import { Room } from './types'
import { useRoomsState } from './state/RoomsState'
import { useSocketsState } from './state/SocketState'
import { useChatState } from './state/ChatState'

function App() {
    const [currentRoom, setRoom] = useState<string>('');
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const roomState = useRoomsState();
    const chatState = useChatState();
    const socketState = useSocketsState();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);

            socket.emit('rooms', "test", (res) => {
                console.log({res})
                roomState.setRooms(res)
            })
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value: string) {
            setFooEvents((previous) => [...previous, value]);
        }

        function onRooms(value: unknown) {
            console.log(value)
        }

        function onMessage(value: string) {
            chatState.onMessage(value)
        }

        socket.on('new_message', onMessage)
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);
        socket.on('rooms', onRooms)


        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
            socket.off('rooms', onRooms)
            socket.off('new_message', onMessage)
        };
    }, [chatState, roomState]);

    const joinRoom = (room: string) => {
        console.log(socketState.socket)
        //  socketState.socket.emit('join_room', room)
        roomState.createRoom(room)
        setRoom(room)
    }

    return (
        <main>
            <div className='bg-gray-500 p-8 flex flex-col items-center gap-4'>
                <h1 className='text-4xl text-orange-400'>Chat App</h1>
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
                        <span className='text-2xl'>Room: {currentRoom}</span>
                        <button className='bg-white text-black rounded hover:text-blue-800 w-24' onClick={() => setRoom('')}>Exit</button>
                    </div>
                    <ChatRoom />
                </>
            ) :
                (
                    <>
                        <section className='flex flex-col items-start'>
                            <button className='bg-gray-500 p-2 rounded text-orange-400' onClick={() => setModalOpen(!modalOpen)}>New Room</button>
                            <div className='flex justify-center py-4'>
                                <RoomSelector rooms={roomState.rooms} onRoomSelect={joinRoom} />
                            </div>
                        </section>
                        {modalOpen && (
                            <RoomModal createAndJoinRoom={joinRoom} />
                        )}
                    </>


                )
            }
        </main>
    )
}

export default App

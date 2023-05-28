import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatState, ChatStateProvider } from './state/ChatState.ts'
import { RoomState, RoomsStateProvider } from './state/RoomsState.ts'
import { SocketState, SocketsStateProvider } from './state/SocketState.ts'
import { socket } from './socket.ts'

const socketState = new SocketState(socket)
const chatState = new ChatState(socketState);
const roomState = new RoomState(socketState);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SocketsStateProvider value={socketState}>
            <RoomsStateProvider value={roomState}>
                <ChatStateProvider value={chatState}>
                    <App />
                </ChatStateProvider>
            </RoomsStateProvider>
        </SocketsStateProvider>
    </React.StrictMode>,
)

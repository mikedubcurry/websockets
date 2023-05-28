import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatState, ChatStateProvider } from './state/ChatState.ts'
import { RoomState, RoomsStateProvider } from './state/RoomsState.ts'

const chatState = new ChatState();
const roomState = new RoomState();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RoomsStateProvider value={roomState}>
            <ChatStateProvider value={chatState}>
                <App />
            </ChatStateProvider>
        </RoomsStateProvider>
    </React.StrictMode>,
)

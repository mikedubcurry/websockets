import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatState, ChatStateProvider } from './state/ChatState.ts'

const chatState = new ChatState();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChatStateProvider value={chatState}>
            <App />
        </ChatStateProvider>
    </React.StrictMode>,
)

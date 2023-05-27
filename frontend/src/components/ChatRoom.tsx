import { ChatInput } from "./ChatInput"
import { MessageList } from "./MessageList"

export const ChatRoom = () => {

    return (
        <div className='flex flex-col gap-4 p-8'>
            <div className="m-24">
                <MessageList followAtBottom />
            </div>
            <div className="fixed bottom-0 w-full -mx-8">
                <ChatInput />
            </div>
        </div>

    )
}

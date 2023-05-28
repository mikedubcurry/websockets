import { useRef, useState } from "react"
import { Room } from "../types"

export type RoomSelectorProps = {
    rooms: string[]
    onRoomSelect: (room: string) => void
}

export const RoomSelector = ({ rooms, onRoomSelect }: RoomSelectorProps) => {
    const [hovering, setHovering] = useState<null | number>(null);

    return (
        <div className="grid grid-cols-3 justify-items-center w-8/12">
            {rooms.map((room, i) => (
                <div
                    key={room + i}
                    className={`p-8  bg-gray-500 transition-all duration-500 rounded${hovering === i ? '' : '-lg'
                        } flex flex-col gap-4 justify-between`}>
                    <span className="self-center font-bold text-lg uppercase">
                        {room}
                    </span>
                    <HoverButton text="Join Room" onClick={() => onRoomSelect(room)} onHover={() => {
                        setHovering(i)
                        return () => setHovering(null)
                    }} />
                    <em className="text-blue-400">69 active users</em>
                </div>
            ))}
        </div>
    )
}

export type HoverButtonProps = {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onHover: () => () => void
}

function HoverButton({ text, onClick, onHover }: HoverButtonProps) {
    const ref = useRef<() => void>();
    const onMouseOver = () => {
        ref.current = onHover()
    }

    const onMouseOut = () => {
        if (ref.current) {
            ref.current();
        }
    }

    return (
        <button
            className="bg-white text-black rounded hover:text-blue-800"
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            onClick={onClick}>
            {text}
        </button>
    )
}

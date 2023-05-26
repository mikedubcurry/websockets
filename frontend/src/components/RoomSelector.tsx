import { Room } from "../types"

export type RoomSelectorProps = {
    rooms: Room[]
    onRoomSelect: (room: Room) => void
}

export const RoomSelector = ({ rooms, onRoomSelect }: RoomSelectorProps) => {
    return (
        <div className="grid grid-cols-3 justify-items-center">
            {rooms.map((room) => (
                <div key={room.id} className="p-8 bg-gray-600 rounded-md flex flex-col gap-4 justify-between">
                    <span className="self-center font-bold text-lg uppercase">
                        {room.name}
                    </span>
                    <button onClick={() => onRoomSelect(room)} className="bg-white text-black rounded hover:text-blue-800">Join Room</button>
                    <em className="text-blue-400">{room.members} active users</em>
                </div>
            ))}
        </div>
    )
}

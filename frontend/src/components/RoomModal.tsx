import { observer } from "mobx-react";
import {  useState } from "react";

export type RoomModalProps = {
    createAndJoinRoom: (room: string) => void
}

export const RoomModal = observer(({ createAndJoinRoom }: RoomModalProps) => {
    const [name, setRoomName] = useState('');
    return (
        <dialog  className="bg-gray-500 rounded-lg p-8" open>
            <form
                className="flex flex-col gap-4 items-center"
                onSubmit={e => {
                    e.preventDefault();
                    if (!name) return
                    createAndJoinRoom(name)
                    setRoomName('')
                }} >
                <label className="flex gap-2">
                    <span className="text-sm">Room Name</span>
                    <input className="bg-gray-400 text-black text-center" value={name} onChange={e => setRoomName(e.target.value)} />
                </label>
                <button className="bg-orange-400 text-white p-2 rounded">Create and Join</button>
            </form>
        </dialog>
    )
})

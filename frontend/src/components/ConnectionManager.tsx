import { socket } from "../socket";

export const ConnectionManager = ({ isConnected }: { isConnected: boolean }) => {
    function connect() {
        socket.connect();
    }
    function disconnect() {
        socket.disconnect();
    }

    if (isConnected)
        return <button onClick={disconnect}>Disconnect</button>
    else
        return <button onClick={connect}>Connect</button>

}

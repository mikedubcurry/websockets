"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = require("fs");
dotenv_1.default.config();
const app = (0, express_1.default)();
//const pubClient = createClient({
//});
//const subClient = pubClient.duplicate();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined', {
    skip: (_, res) => res.statusCode < 400,
    stream: (0, fs_1.createWriteStream)('./access.log', {
        flags: 'a'
    })
}));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    // adapter: createAdapter(pubClient, subClient)
});
const port = process.env.PORT || 3000;
// some auth-lite middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === 'secret') {
        next();
    }
    else {
        next(new Error('invalid token'));
    }
});
io.on('connection', (socket) => {
    socket.on('rooms', function (junk, callback) {
        const rooms = getRooms();
        if (typeof callback === 'function') {
            callback(rooms);
        }
    });
    socket.on('join_room', (room, callback) => {
        if (room) {
            console.log({ room });
            socket.join(room);
            socket.emit('room_joined', getRooms());
            if (typeof callback === 'function') {
                const rooms = getRooms();
                console.log(rooms);
                callback(rooms);
            }
        }
    });
    socket.on('leave_room', (room) => {
        socket.leave(room);
        socket.emit('room_leave', room);
    });
    socket.on('new_chat', (message, room) => {
        socket.to(room).emit('new_message', JSON.stringify({ text: message, sender: socket.id, createdAt: new Date(), room }));
    });
});
httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
function getRooms(namespace = "") {
    const connections = io.sockets.sockets;
    return Array.from(io.of(namespace).adapter.rooms).filter(([i]) => !connections.has(i)).map(val => val[0]);
}

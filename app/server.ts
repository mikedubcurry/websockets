import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import morgan from 'morgan'
import { createWriteStream } from 'fs'
//import { authMiddleware } from './middlewares'
//import { createClient } from 'redis'
//import { createAdapter } from '@socket.io/redis-adapter'


const app = express();

//const pubClient = createClient({
//});
//const subClient = pubClient.duplicate();

app.use(express.json());
app.use(morgan('combined', {
    skip: (_, res) => res.statusCode < 400,
    stream: createWriteStream('./access.log', {
        flags: 'a'
    })
}));
//app.use(authMiddleware)

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    // adapter: createAdapter(pubClient, subClient)
});


// some auth-lite middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === 'secret') {
        next();
    } else {
        next(new Error('invalid token'));
    }
});

io.on('connection', (socket) => {
    // can import this callback function from a websocket controller file
    socket.on('rooms', function(junk: string, callback: (data: any) => void | undefined) {
        const rooms = getRooms();
        if (typeof callback === 'function') {

            callback(rooms)
        }

    })

    socket.on('join_room', (room: string, callback: (data: any) => void | undefined) => {
        if (room) {
            console.log({ room })
            socket.join(room);
            socket.emit('room_joined', getRooms())
            if (typeof callback === 'function') {
                const rooms = getRooms()
                console.log(rooms)
                callback(rooms)
            }
        }
    })

    socket.on('leave_room', (room: string) => {
        socket.leave(room);
        socket.emit('room_leave', room)
    })

    socket.on('new_chat', (message: string, room: string) => {
        socket.to(room).emit('new_message', JSON.stringify({ text: message, sender: socket.id, createdAt: new Date(), room }))
    })
});

function getRooms(namespace: string = "") {
    const connections = io.sockets.sockets;
    return Array.from(io.of(namespace).adapter.rooms).filter(([i]) => !connections.has(i)).map(val => val[0])
}


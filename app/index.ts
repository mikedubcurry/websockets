import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { createWriteStream } from 'fs'
import { createClient } from 'redis'
import { createAdapter } from '@socket.io/redis-adapter'

dotenv.config();

const app = express();

const pubClient = createClient({
    url: "http://localhost:6379"
});
const subClient = pubClient.duplicate();

app.use(express.json());
app.use(morgan('combined', {
    skip: (_, res) => res.statusCode < 400,
    stream: createWriteStream('./access.log', {
        flags: 'a'
    })
}));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    adapter: createAdapter(pubClient, subClient)
});

const port = process.env.PORT || 3000;

// some auth-lite middleware
io.use((socket, next) => {
    console.log({ socket })
    const token = socket.handshake.auth.token;
    if (token === 'secret') {
        next();
    } else {
        next(new Error('invalid token'));
    }
});



io.on('connection', (socket) => {
    socket.on('rooms', () => {
        console.log(getRooms())
        socket.emit('rooms', getRooms())
    })

    socket.on('join_room', (room: string) => {
        socket.join(room);
        socket.emit('room_joined', room)
    })

    socket.on('leave_room', (room: string) => {
        socket.leave(room);
        socket.emit('room_leave', room)
    })

    socket.on('new_chat', (message: string, room: string) => {
        socket.to(room).emit('new_message', message)
    })
});

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


function getRooms(namespace: string = "/") {
    return io.of(namespace).adapter.rooms;
}

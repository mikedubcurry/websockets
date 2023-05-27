import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { createWriteStream } from 'fs'

dotenv.config();

const app = express();
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
    }
});

const port = process.env.PORT || 3000;

io.use((socket, next) => {
    console.log({ socket })
    // do some auth check
    next();
});


io.on('connection', (socket) => {
    console.log('a user connected');
});

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


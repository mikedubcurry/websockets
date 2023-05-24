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
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const fs_1 = require("fs");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: (0, fs_1.createWriteStream)('./access.log', {
        flags: 'a'
    })
}));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const port = process.env.PORT || 3000;
const notes = [];
app.get('/', (req, res) => {
    res.send(`Hello. Here are your notes: ${notes.join('<br/>')}`);
});
app.post('/notes', (req, res) => {
    if (!req.body.note) {
        res.status(400).send('Missing note');
        return;
    }
    const note = (0, sanitize_html_1.default)(req.body.note);
    console.log({ note });
    if (note) {
        notes.push(note);
        res.send(`Note added: ${req.body.note}`);
    }
    else {
        res.status(400).json({ error: 'bad note' });
    }
});
//app.listen(port);
io.on('connection', (socket) => {
    console.log('a user connected');
});
httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

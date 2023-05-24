import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import sanitize from 'sanitize-html'
import { createWriteStream } from 'fs'

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: createWriteStream('./access.log', {
        flags: 'a'
    })
}));

const port = process.env.PORT || 3000;

const notes: string[] = [];

app.get('/', (req, res) => {
    res.send(`Hello. Here are your notes: ${notes.join('<br/>')}`);
});

app.post('/notes', (req, res) => {
    if (!req.body.note) {
        res.status(400).send('Missing note');
        return;
    }
    const note = sanitize(req.body.note);
    console.log({ note });
    if (note) {
        notes.push(note);
        res.send(`Note added: ${req.body.note}`);
    } else {
        res.status(400).json({ error: 'bad note' });
    }
});


app.listen(port);



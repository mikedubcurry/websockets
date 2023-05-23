import express from 'express'
import dotenv from 'dotenv'
import sanitize from 'sanitize-html'

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const notes: string[] = [];

app.get('/', (req, res) => {
    res.send(`Hello. Here are your notes: ${notes.join('<br/>')}`);
});

app.post('/notes', (req, res) => {
    if(!req.body.note) {
        res.status(400).send('Missing note');
        return;
    }
    const note = sanitize(req.body.note);
    notes.push(note);

    res.send(`Note added: ${req.body.note}`);
});

app.listen(port);



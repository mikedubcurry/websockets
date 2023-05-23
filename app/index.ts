import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const notes: string[] = [];

app.get('/', (req, res) => {
    res.send(`Hello. Here are your notes: ${notes.join(', ')}`);
});

app.post('/notes', (req, res) => {
    notes.push(req.body.note);
    res.send(`Note added: ${req.body.note}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



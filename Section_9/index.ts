import express from 'express';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log('Someone just pigned!');
    res.send('pong');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
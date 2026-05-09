import express from 'express';

console.log("SERVER FILE IS RUNNING");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
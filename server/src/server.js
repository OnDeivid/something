const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
const obj = {
    heroesCount: 0,
    goatCount: 0
}
const app = express();
app.use(express.json());
app.use(cors()); // Allows frontend to communicate

const pusher = new Pusher({
    appId: "1955447",
    key: "825cb99923b8b343513f",
    secret: "6aa203825b74346582db",
    cluster: "eu",
    useTLS: true
});

// Store vote count
app.get('/get', (req, res) => {
    res.json({ success: true, count: obj });
})


app.post('/vote/heroes', (req, res) => {
    obj.heroesCount += 1;

    console.log('New vote count:', obj.heroesCount);
    count = obj.heroesCount
    pusher.trigger('chat-channel', 'heroesCountIncrease', { ...obj });

    res.json({ success: true, count: obj });
});

app.post('/vote/goat', (req, res) => {
    obj.goatCount += 1;

    console.log('New vote count:', obj.goatCount);
    count = obj.goatCount
    pusher.trigger('chat-channel', 'goatCountIncrease', { ...obj });

    res.json({ success: true, count: obj });
});

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
module.exports = app;
const express = require('express');
// const fetch = require('node-fetch'); // Import node-fetch

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5601;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

async function sendMessageToTelegram(message) {

    var botToken = process.env.TELEGRAM_BOT_TOKEN
    var chatId = process.env.TELEGRAM_CHAT_ID

    try {
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Failed to send notification');
    }
}

const auth = async (req, res, next) => {
    
    const headers = req.headers;
    const secertKeyComing = headers['x-secret']

    if (secertKeyComing !== process.env.SECERTKEY)
    return res.sendStatus(401);

    next(); // this is middleware so next() must be called unconditionally 
            // to pass on req to other functions otherwise req will be blocked
}

// app.post('/trading', auth , async (req, res) => {

app.post('/trading', async (req, res) => {

    var message = ""
    message = req.body["message"]

    if (!message)
     message = "Something goes wrong";

    try {
        //listing messages in users mailbox 
          await sendMessageToTelegram(message)
          res.status(200).json({ message: "Got your webhook Request" });
        } catch (err) {
            console.error('Error handling webhook request:', err);
            res.status(500).json({ error: 'Failed to handle webhook request' });
        }

});

app.post('/tiqswh', async (req, res) => {

    var message = ""
    // message = req.body["message"]
    // console.log(message)

    // Convert the entire request body to a JSON string
    message = JSON.stringify(req.body);
    console.log(message);

    if (!message)
     message = "Wrong";

    try {
        //listing messages in users mailbox 
          await sendMessageToTelegram(message)
          res.status(200).json({ message: "Got your webhook Request" });
        } catch (err) {
            console.error('Error handling webhook request:', err);
            res.status(500).json({ error: 'Failed to handle webhook request' });
        }

});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});

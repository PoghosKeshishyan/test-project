const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/cards', require('./routes/cards.route'));

start();

async function start() {
    try {
        await mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })

        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}...`)
            console.log('DB ok');
        });
    } catch (error) {
        console.log('Server Error', error.message);
    }
}

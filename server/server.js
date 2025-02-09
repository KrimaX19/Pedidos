const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ordersRoute = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Usuário e senha definidos
const USERNAME = 'teste';
const PASSWORD = 'teste';

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required.');
    }

    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    if (username === USERNAME && password === PASSWORD) {
        return next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Invalid credentials.');
    }
};

mongoose.connect('mongodb://localhost:27017/ordersdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/orders', authMiddleware, ordersRoute);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

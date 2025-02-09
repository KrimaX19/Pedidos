const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ordersRoute = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/ordersdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api/orders', ordersRoute);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: String,
    work: String,
    orderDate: Date,
    description: String,
    dueDate: Date
});

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    startDate: { type: Date, required: true },
    renewalDate: { type: Date, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;

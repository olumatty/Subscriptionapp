const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
});

module.exports = mongoose.model('Platform', PlatformSchema);

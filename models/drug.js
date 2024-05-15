const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema ({
    genericName: {
        type: String,
        required: true,
    },
    tradeName: {
        type: String,
        required: true,
    },
    reactive: {
        type: Boolean,
        default: false,
    },
    notes: {
        type:String,
        required: true,
    },
    indications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Indication',
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Drug', drugSchema);
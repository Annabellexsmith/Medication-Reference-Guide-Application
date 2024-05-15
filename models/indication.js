const mongoose = require('mongoose');

const indicationSchema = new mongoose.Schema ({
    typeOfCancer: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Indication', indicationSchema);
const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    brand_name:
    {
        type: String,
        required: true
    },
    brand_icon:
    {
        type: String,
        required: true

    }
})
module.exports = mongoose.model('brand', brandSchema);
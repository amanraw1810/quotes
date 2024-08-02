const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    brand_name:
    {
        type: String,
        required: true
    },
    main_category_name:
    {
        type: String,
        required: true
    },
    category_name:
    {
        type: String,
        required: true
    },
    category_icon:
    {
        type: String,
        required: true

    }
})
module.exports = mongoose.model('category', categorySchema);
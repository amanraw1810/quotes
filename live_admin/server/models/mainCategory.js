const mongoose = require('mongoose');
const main_categorySchema = new mongoose.Schema({
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
    main_category_icon:
    {
        type: String,
        required: true

    }
})
module.exports = mongoose.model('main_category', main_categorySchema);
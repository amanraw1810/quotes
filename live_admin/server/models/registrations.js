const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    f_name:
    {
        type: String,
        required: true
    },
    l_name:
    {
        type: String,
        required: true
    },
    email_id:
    {
        type: String,
        required: true,
        unique: true
    },
    mob_no:
    {
        type: String,
        required: true,
        unique: true
    },
    pass:
    {
        type: String,
        required: true
    },
    picture:
    {
        type: String,
        required: true

    }
})
module.exports = mongoose.model('registration', userSchema);
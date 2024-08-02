const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    main_category_name: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    sub_category_name: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_size_qty: {
        type: String,
        required: true
    },
    product_color: {
        type: String,
        required: true
    },
    product_price_before:{
        type: String,
        required: true
    },
    product_price_after:{
        type: String,
        required: true
    },
    product_features: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },
    product_meta_title: {
        type: String,
        required: true
    },
    product_meta_desc: {
        type: String,
        required: true
    },
    product_icon_alt: {
        type: String,
        required: true
    },
    product_icon: {
        type: [String],
        required: true
    }
});

// Static method to find products by sub_category_name
productSchema.statics.findByMainCategoryName = function (main_category_name) {
    return this.find({ main_category_name }).exec();
};

productSchema.statics.findByCategoryName = function (category_name) {
    return this.find({ category_name }).exec();
};

productSchema.statics.findBySubCategoryName = function (sub_category_name) {
    return this.find({ sub_category_name }).exec();
};

productSchema.statics.findByProductName = function (product_name) {
    return this.find({ product_name }).exec();
};


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

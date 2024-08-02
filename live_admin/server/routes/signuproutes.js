const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const signup = require('../models/signups');
const registration=require('../models/registrations');
const brand = require('../models/brands');
const mainCategory = require('../models/mainCategory');
const category = require('../models/category');
const subCategory = require('../models/subCategory');
const products = require('../models/products');


const saltRounds = 10;

// * For jwt auth * /
const jwt = require('jsonwebtoken');
const jwtsecret = "9999777ggvv666nhhhhh";


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    }
});

const upload = multer({ storage: storage });

// Signup Routes
router.get('/signup-details', async (req, res) => {
    try {
        const data = await signup.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/signup-details', upload.single('picture'), async (req, res) => {
    try {
        const pass_coming = req.body.pass;
        const hash = bcrypt.hashSync(pass_coming, saltRounds);
        const data = await new signup({
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email_id: req.body.email_id,
            mob_no: req.body.mob_no,
            pass: hash,
            picture: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});


// Registration Routes
router.get('/registration-details', async (req, res) => {
    try {
        const data = await registration.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/registration-details', upload.single('picture'), async (req, res) => {
    try {
        const pass_coming = req.body.pass;
        const hash = bcrypt.hashSync(pass_coming, saltRounds);
        const data = await new registration({
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email_id: req.body.email_id,
            mob_no: req.body.mob_no,
            pass: hash,
            picture: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});



//login Routes
router.post("/login", async (req, res, next) => {
    console.log(req.body);
    password = req.body.pass;
    username = req.body.email_id;
    try {

        const recive = await signup.findOne({ email_id: username })
        console.log(recive);
        if (recive) {
            if (bcrypt.compareSync(password, recive.pass)) {

                let payload = { uid: username };
                // console.log(payload)
                let token = jwt.sign(payload, jwtsecret, { expiresIn: 360000 });//generete token
                return res.status(201).send({
                    success: true,
                    message: "Login  Successfully",
                    token,
                });

            }
        }
        else {
            return res.status(201).send({
                success: false,
                message: "Username or password is worng !",

            });
        }

    } catch (err) {
        return res.status(500).send(err);
    }


})


//user login Routes
router.post("/user-login", async (req, res, next) => {
    console.log(req.body);
    password = req.body.pass;
    username = req.body.email_id;
    try {

        const recive = await registration.findOne({ email_id: username })
        console.log(recive);
        if (recive) {
            if (bcrypt.compareSync(password, recive.pass)) {

                let payload = { uid: username };
                // console.log(payload)
                let token = jwt.sign(payload, jwtsecret, { expiresIn: 360000 });//generete token
                return res.status(201).send({
                    success: true,
                    message: "Login  Successfully",
                    token,
                });

            }
        }
        else {
            return res.status(201).send({
                success: false,
                message: "Username or password is worng !",

            });
        }

    } catch (err) {
        return res.status(500).send(err);
    }


})

// Brand Routes
router.get('/brand-details', async (req, res) => {
    try {
        const data = await brand.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/brand-details', upload.single('brand_icon'), async (req, res) => {
    try {
        const data = await new brand({
            brand_name: req.body.brand_name,
            brand_icon: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "Brand Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Brand Delete Routes
router.delete('/brand-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await mainCategory.findByIdAndDelete(id);
        res.json({ success: true, message: 'Main Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ success: false, message: 'Error deleting brand' });
    }
});

// Main Category Routes
router.get('/main-category-details', async (req, res) => {
    try {
        const data = await mainCategory.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/main-category-details', upload.single('main_category_icon'), async (req, res) => {
    try {
        const data = await new mainCategory({
            brand_name: req.body.brand_name,
            main_category_name: req.body.main_category_name,
            main_category_icon: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "Main Category Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});


// Main Category Delete Routes
router.delete('/main-category-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await mainCategory.findByIdAndDelete(id);
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Error deleting brand' });
    }
});

// Category Routes
router.get('/category-details', async (req, res) => {
    try {
        const data = await category.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/category-details', upload.single('category_icon'), async (req, res) => {
    try {
        const data = await new category({
            brand_name: req.body.brand_name,
            main_category_name: req.body.main_category_name,
            category_name: req.body.category_name,
            category_icon: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "Category Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Category Delete Routes
router.delete('/category-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await category.findByIdAndDelete(id);
        res.json({ success: true, message: 'category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Error deleting subCategory' });
    }
});


// Sub Category Routes
router.get('/sub-category-details', async (req, res) => {
    try {
        const data = await subCategory.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/sub-category-details', upload.single('sub_category_icon'), async (req, res) => {
    try {
        const data = await new subCategory({
            brand_name: req.body.brand_name,
            main_category_name: req.body.main_category_name,
            category_name: req.body.category_name,
            sub_category_name: req.body.sub_category_name,
            sub_category_icon: req.file.filename
        }).save();
        res.status(201).send({
            success: true,
            message: "Sub Category Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Sub Category Delete Routes
router.delete('/sub-category-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await subCategory.findByIdAndDelete(id);
        res.json({ success: true, message: 'subCategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting subCategory:', error);
        res.status(500).json({ success: false, message: 'Error deleting subCategory' });
    }
});



// Product Routes
router.get('/product-details', async (req, res) => {
    try {
        const data = await products.find({});
        res.status(200).send({
            success: true,
            message: "All Records Found",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post('/product-details', upload.array('product_icon', 10), async (req, res) => {
    try {
        const productIcons = req.files.map(file => file.filename);
        const data = await new products({
            brand_name: req.body.brand_name,
            main_category_name: req.body.main_category_name,
            category_name: req.body.category_name,
            sub_category_name: req.body.sub_category_name,
            product_name: req.body.product_name,
            product_size_qty: req.body.product_size_qty,
            product_price_before: req.body.product_price_before,
            product_price_after: req.body.product_price_after,
            product_color: req.body.product_color,
            product_features: req.body.product_features,
            product_desc: req.body.product_desc,
           product_meta_title: req.body.product_meta_title,
           product_meta_desc: req.body.product_meta_desc,
           product_icon_alt: req.body.product_icon_alt,
           
            product_icon: productIcons // Store the array of file names
        }).save();
        res.status(201).send({
            success: true,
            message: "Product Registered Successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});



// Products Delete Routes
router.delete('/product-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await products.findByIdAndDelete(id);
        res.json({ success: true, message: 'products deleted successfully' });
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).json({ success: false, message: 'Error deleting products' });
    }
});

// Product-details route
router.get('/product-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.findById(id); // Correct method to find by ID
        if (product) {
            res.json({ data: product }); // Return the product directly
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
});


router.get('/sub-category/:sub_category_name', async (req, res) => {
    try {
        const { sub_category_name } = req.params;
        const product = await products.findBySubCategoryName(sub_category_name);// Correct method to find by ID
        if (product) {
            res.json({ data: product }); // Return the product directly
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
});


router.get('/category/:category_name', async (req, res) => {
    try {
        const { category_name } = req.params;
        const product = await products.findByCategoryName(category_name);// Correct method to find by ID
        if (product) {
            res.json({ data: product }); // Return the product directly
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
});

// Product Search Route

// Define the route handler for fetching search results



router.get('/searching-product/:searchQuery', async (req, res) => {
    try {
        const { searchQuery } = req.params;

        // Perform a single database query to search for products based on the provided search query
        const product = await products.find({
            $or: [
                { main_category_name: searchQuery },
                { category_name: searchQuery },
                { sub_category_name: searchQuery },
                { product_name: searchQuery }
            ]
        });

        // Check if products are found
        if (product.length > 0) {
            res.json({ data: product });
        } else {
            res.status(404).json({ error: 'No products found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
});


// Route to fetch product suggestions based on search query
router.get('/search-suggestions/:searchQuery', async (req, res) => {
    try {
        const { searchQuery } = req.params;

        // Perform a database query to search for products based on the provided search query
        const product = await products.aggregate([
            {
                $match: {
                    $or: [
                        { main_category_name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
                        { category_name: { $regex: searchQuery, $options: 'i' } },
                        { sub_category_name: { $regex: searchQuery, $options: 'i' } },
                        { product_name: { $regex: searchQuery, $options: 'i' } }
                    ]
                }
            },
            {
                $addFields: {
                    priority: {
                        $cond: {
                            if: {
                                $or: [
                                    { $regexMatch: { input: "$main_category_name", regex: `^${searchQuery}`, options: "i" } },
                                    { $regexMatch: { input: "$category_name", regex: `^${searchQuery}`, options: "i" } },
                                    { $regexMatch: { input: "$sub_category_name", regex: `^${searchQuery}`, options: "i" } },
                                    { $regexMatch: { input: "$product_name", regex: `^${searchQuery}`, options: "i" } }
                                ]
                            },
                            then: 0,
                            else: 1
                        }
                    }
                }
            },
            {
                $sort: { priority: 1 }
            },
            {
                $limit: 10
            }
        ]);

        // Extract relevant fields for suggestions
        const suggestions = product.map(product => ({
            main_category_name: product.main_category_name,
            category_name: product.category_name,
            sub_category_name: product.sub_category_name,
            product_name: product.product_name
        }));

        res.json({ suggestions });
    } catch (error) {
        console.error('Error fetching product suggestions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;


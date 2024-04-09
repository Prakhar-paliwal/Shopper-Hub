const express = require('express');
const  router = express.Router();

const {addProduct, removeProduct, allProducts, newCollection, popularInWomen} = require('../controllers/productController');
const { userSignUp, userLogin, addToCart, removeFromCart, getCart } = require('../controllers/userController');

const jwt = require('jsonwebtoken');


router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', allProducts);
//creating route for new collection data
router.get('/newcollections', newCollection);
router.get('/popularinwomen', popularInWomen);

router.post('/signup', userSignUp);
router.post('/login', userLogin);

//creating middleware to fetch User
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({
            message: error.message,
            error: "Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({
                message: error.message,
                error: "Please authenticate using valid token"})
        }
    }
}

router.post('/addtocart',fetchUser, addToCart)
router.post('/removefromcart', fetchUser, removeFromCart)

//creating api route to get cart Data of user after login
router.post('/getcart',fetchUser, getCart)

module.exports = router;
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

exports.userSignUp = async(req,res) => {
    try{
        let check = await Users.findOne({email:req.body.email});
        if(check){
            return res.status(400).json({
                success: false,
                error: "Existing User found with same Email address"
            })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;            
        }
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })

        await user.save();

        //jwt authentication

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.status(200).json({
            success: true, token
        })
        
    }
    catch(error){
        res.json({
            success: false,
            error: error.message
        });
    }
}

exports.userLogin = async(req, res) => {
    try{
        let user = await Users.findOne({email: req.body.email});
        if(user){
            const passCompare = req.body.password === user.password;
            if(passCompare){
                const data = {
                    user: {
                        id:user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.status(200).json({
                    success:true, token
                });
            }
            else{
                res.json({success: false, error: "Wrong Password"})
            }
        }
        else{
            res.json({
                success: false, error: "Wrong Email Address"
            })
        }
    }
    catch(error){
        res.json({
            success: false,
            error: error.message
        });
    }
}



//creating endpoint for adding products in cartdata

exports.addToCart = async(req, res) => {
    try{
        // console.log(req.body, req.user);
        console.log("Added", req.body.itemId);

        let userData = await Users.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
        res.send({message: "Product added to Cart"});
    }
    catch(error){
        res.json({
            success: false,
            error: error.message
        })
    }
}

exports.removeFromCart = async(req,res) => {
    try{
        // console.log(req.body, req.user);
        console.log("Removed", req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        
        if(userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
        
        await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
        res.send({message: "Product removed from cart"});
    }
    catch(error){
        res.json({
            success: false,
            error: error.message
        })
    }
}

exports.getCart = async(req,res) => {
    try{
        console.log('Get Cart');
        let userData = await Users.findOne({_id: req.user.id});
        res.json(userData.cartData);

    }
    catch(error){
        res.json({
            success: false,
            error: error.message
        })
    }
}
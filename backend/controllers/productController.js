const Product = require('../models/product');

//creating api for adding product
exports.addProduct = async(req,res) =>{
    try{
        let products = await Product.find({})
        let id;
        if(products.length>0){
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0]
            id = last_product.id+1;
        }
        else{
            id = 1;
        }
        const product = new Product({
            id: id,
            name : req.body.name, 
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        })
        console.log(product);
        await product.save(); // save the product to the database
        console.log("saved"); // print the saved message only after the product is successfully saved
        res.status(200).json({
            success: true,
            name: req.body.name,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//creating api for removing product

exports.removeProduct = async(req, res) => {
    try{
        await Product.findOneAndDelete({id:req.body.id});
        console.log("removed product");
        res.status(200).json({
            success:true,
            name: req.body.name
        })
    }
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    }
}

//creating api for getting all products

exports.allProducts = async(req, res) => {
    try{
        let products = await Product.find({});
        console.log("All Products fetched");
        res.send(products);
    }
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    }
}

exports.newCollection = async(req,res) => {
    try{
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("New Collection Fetched");
        res.status(200).send(newcollection);
    }
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    }
}

exports.popularInWomen = async(req, res) => {
    try
    {
        let products = await Product.find({category:"women"});
        let popular_in_women = products.slice(0,4);
        console.log("Popular in women fetched");
        res.status(200).send(popular_in_women);
    }
    catch(error){
        res.json({
            success:false,
            error: error.message
        })
    }
}
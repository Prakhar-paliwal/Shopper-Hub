// const PORT = 4000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer =require('multer');
const path = require("path");
const cors = require('cors');

require('dotenv').config();

app.use(express.json()); //request automatically passed throught json
app.use(cors()); //react.js project connects to express app on 4000 PORT

//Schema for Creating Products, users -> in models
//connection to mongoDB
const dbConnect = require('./config/database');
dbConnect();

//API creation

app.get('/', (req, res)=> {
    res.send("Express App is running");
})


//created a folder upload so any image added goes to that folder
// Image Storage engine using multer

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

//Creating upload endpoint for images

app.use('/images', express.static('upload/images')) // for image url

app.post('/upload', upload.single('product'), (req,res)=>{
    res.json({
        success: true,
        image_URL: `http://127.0.0.1:${process.env.PORT}/images/${req.file.filename}`
    });
});


const routes = require('./routes/routes');
app.use('/', routes);

app.listen(process.env.PORT, (error)=>{
    if(!error){
        console.log(`Server running on port ${process.env.PORT}`);
    }
    else{
        console.log(`Error: ${error.message}`)
    }
});
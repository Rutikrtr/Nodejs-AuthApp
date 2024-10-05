const express = require('express');
const Router = express.Router();

const {signup,login} = require('../Controllers/Auth');
const {auth,isStudent,isAdmin} = require('../middleware/auth');


Router.post('/login',login);
Router.post('/signup',signup)

Router.get("/test",auth,(req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protectted Route for Tesing"
    })
})

Router.get("/student",auth ,isStudent , (req,res) => {
    res.json({
        success:true,
        message:"Welcome to Student Protected Route"
    })
})

Router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Admin Protected Route"
    })
})
module.exports = Router;  
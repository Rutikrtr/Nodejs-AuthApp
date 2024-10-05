const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

// signup 

exports.signup = async(req,res) => {
    try {
        const {name,email,password,role} = req.body;
        const exitingUser = await User.findOne({email});
        if(exitingUser){
            res.status(400).json({
                success:false,
                message:"User Already Exist",
            })
        }

        // secure password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password,10);
        } 
        catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            })
        }

        const user = await User.create({
            name,email,password:hashPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"SignUp Successfully",
        })
    } 
    catch (error) { 
        console.log(error)
        return res.status(403).json({
            success:false,
            message:"Error in Signup"
        })
    }
}

// login

exports.login = async(req,res) => {
    try {
        const {email,password}  = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Plaese Fill all the details",
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is Not Registered"
            })
        }


        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        // verify password and generate JWT token
        if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                })
            
           
            // user = user.toObject();
            user.token = token;
            user.password = undefined;

            


            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Login SuccessFully"
            })
        }
        else{
            // password not match
            return res.status(403).json({
                success:false,
                message:"Password incorrect",
            })
        }
    } 
    catch (error) {
        return res.status(200).json({
            success:false,
            message:"Login Faileed",
        })
    }
}

// 9226770250
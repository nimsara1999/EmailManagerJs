const express = require('express');
const connection = require('../connection');
const router = express.Router();

//for generate jw token import
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


//initial setup for signup or login by checking database
router.post('/signup', (req, res) => {
    let user = req.body;
    query = "SELECT email,user_password FROM recipient WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        //if email not exist in the database,insert data
        if (!err) {
            if (results.length <= 0) {
                query = "INSERT INTO recipient(email,user_password,recip_name,nick_name,post_id,birthday,status) VALUES (?,?,?,?,?,?,0)"
                connection.query(query, [user.email, user.user_password, user.recip_name, user.nick_name, user.post_id, user.birthday], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email Already Exist" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


//Setup user login api
router.post('/login', (req, res) => {
    const user = req.body;
    query = "SELECT recipient.email,recipient.user_password,post.post,status FROM recipient LEFT JOIN post ON recipient.post_id=post.post_id  WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].user_password != user.user_password) {
                return res.status(401).json({ message: "Incorrect Username or Password" })
            }
            else if (results[0].status == 0) {
                return res.status(401).json({ message: "Wait for admin Approvel" });
            }
            else if (results[0].user_password == user.user_password) {
                const response = { email: results[0].email, post: results[0].post }
                const accessToken = jwt.sign(response, process.env.access_Token, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });

            }
            else {
                return res.status(400).json({ message: "Something went wrong" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})


//setup forgot password api
router.post('/forgotPassword',(req,res)=>{
    const user= req.body;
    query = "SELECT email,user_password FROM recipient WHERE email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(200).json({message:"Password sent successfully to your email."})
            }
            else{
                var mailOptions ={
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by EmailManager.',
                    html: '<p><b>Your Login Details of EmailManager</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].user_password+'<br><a href="http://localhost:4200/">Click here to login</a></p>'
                };
                transporter.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: '+info.response);
                    }
                });
                return res.status(200).json({message:"Password sent successfuly to your email."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})


//get all the users details using token, api
//Only admin can use that method (because checkRole function)
router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query = "SELECT recipient.email,post.post,status FROM recipient LEFT JOIN post ON recipient.post_id=post.post_id  WHERE post.post!='administrator'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


//change the status value in the table from UI using api
//Only admin can use that method (because checkRole function)
router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let user = req.body;
    var query ="Update recipient SET status=? WHERE email=?";
    connection.query(query,[user.status,user.email],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404),json({message:"User email does not exist"})
            }
            return res.status(200).json({message:"User Updated Successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})



router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message: "true"});
})


//Reset password for user api
router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const user = req.body;
    const email = res.locals.email; //email address get using token
    console.log(email);
    var query = "SELECT *FROM recipient WHERE email=? AND user_password=?";
    connection.query(query,[email,user.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message:"Incorrect old password"})
            }
            else if(results[0].user_password == user.oldPassword){
                var query = "UPDATE recipient SET user_password=? WHERE email=?"
                connection.query(query,[user.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Password Updated Successfully."})
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message:"Something went wrong. Please try again later"})
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
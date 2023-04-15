const express = require('express');
const connection = require('../connection');
const router = express.Router();

//signup or login by checking database
router.post('/signup',(req,res)=>{
    let user = req.body;
    query = "SELECT email,user_password FROM recipient WHERE email=?";
    connection.query(query,[user.email],(err,results)=>{
        //if email not exist in the database,insert data
        if(!err){
            if(results.length<=0){
                query = "INSERT INTO recipient(email,user_password,recip_name,nick_name,post_id,birthday,state) VALUES (?,?,?,?,?,?,0)"
                connection.query(query,[user.email, user.user_password,user.recip_name,user.nick_name,user.post_id,user.birthday],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Successfully Registered"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message: "Email Already Exist"});
            }
        }
    else{
        return res.status(500).json(err);
    }
    })
})

module.exports = router;

//message_data.js use for add or remove sent messages
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


//Send or recieve message only for registered users
router.post('/add',auth.authenticateToken,(req,res)=>{
    let message_data = req.body;
    var query = "INSERT INTO message_data(fromAddr,toAddr,heading,body,sent_date,sent_time) values(?,?,?,?,curdate(),curtime())";
    connection.query(query,[message_data.fromAddr,message_data.toAddr,message_data.heading,message_data.body,message_data.sent_date,message_data.sent_time],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Sent message added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


//Get all sent mails by particular sender
router.get('/sentBox',auth.authenticateToken,(req,res,next)=>{
    let from = req.body;
    var query = "SELECT fromAddr,toAddr,heading,body,sent_date,sent_time FROM message_data WHERE fromAddr=?";
    connection.query(query,[from.fromAddr],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


//Get all recieve mails for particular email
router.get('/inBox',auth.authenticateToken,(req,res,next)=>{
    let to = req.body;
    var query = "SELECT fromAddr,toAddr,heading,body,sent_date,sent_time FROM message_data WHERE toAddr=?";
    connection.query(query,[to.toAddr],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
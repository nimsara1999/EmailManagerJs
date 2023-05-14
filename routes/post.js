//post.js use for add or remove new posts to post table
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let post = req.body;
    query = "INSERT INTO post(post) values(?)";
    connection.query(query,[post.post],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"New post added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "SELECT post FROM post order by post";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let post = req.body;
    var query ="Update post SET post=? WHERE id=?";
    connection.query(query,[post.post,post.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404),json({message:"Id does not found"})
            }
            return res.status(200).json({message:"Post Updated Successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;

const express = require('express');
const connection = require('../connection');
const router = express.Router();

//for generate jw token import
const jwt = require('jsonwebtoken');
require('dotenv').config();



//signup or login by checking database
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

//user login api
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

module.exports = router;

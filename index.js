const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user'); 
const postRoute = require('./routes/post');
const message_dataRoute = require('./routes/message_data');
const dashboardRoute = require('./routes/dashboard')
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/post',postRoute);
app.use('/message_data',message_dataRoute);
app.use('/dashboard',dashboardRoute);

module.exports = app;

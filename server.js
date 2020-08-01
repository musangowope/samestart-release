  
const express = require('express');
const http = require('http') ;

const app = express() ;
const port =  process.env.PORT || 2000 ;

app.use('/' , express.static(__dirname + '/build'));



const server = http.createServer(app) ;

server.listen(port , () => {
    console.log('running')
})
var express = require('express');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var config = require("./config"); // can leave without parenthesis and it will work without require().
var mongoose = require("mongoose");
var app = express();
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Connected to the database');
	}
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));
var api = require('./app/routes/api')(app,express/*,io*/);
app.use('/api',api); //I forget the 'api',instead of '/api'

app.get('/*',function(req,res){
	res.sendFile(__dirname +'/public/views/index.html');
})


/*http*/app.listen(config.port,function(err){
	if(err){
		console.log(err);		
	}
	else{
		console.log("my server is listening on port 3000");
	}
});
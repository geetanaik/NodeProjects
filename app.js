/**
 * Module dependencies.
 * This is the main file for Node.js
 */
//This is my express framework
var express = require('express');
//this is to handle the http request
var  http = require('http');
//This is to deal with path
var  path = require('path');
var bodyParser = require('body-parser');
//instantiating the express framework
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//To take input from the client
//app.use(express.bodyParser());
//#######################
//This means your data can come from client  in the request body as html form data
app.use(bodyParser.urlencoded({extended: false}));
//to read json data from request body 
app.use(express.json());

var functionToConnDb=require('./mongo-connect');
//call the function to connect with database
functionToConnDb();

/*app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
	  res.header("Access-Control-Allow-Credentials", "*");
	  //res.header("Access-Control-Allow-Headers", "*");
	  res.header("Access-Control-Expose-Headers", "x-access-token");
	  next();
	});	*/

//ProObject -- >> holding just definition
// ./ ->>> in current directory


var ProfileDef=require('./model/profile'); //important  - >>>do not give extension
//This is dummy profile ,,,,,,,,,,,,,,,,,,,,,,,,,
var pofile1=new ProfileDef("Nagendra kumar","test12","nagen@gmail.com","Male","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlRriLVd11QaMe0suGWewi2AjP4X9tI55All09seJrBQqcKTEig");
var pofile2=new ProfileDef("Ameya kumar","tes6t12","ameya@gmail.com","Male","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlRriLVd11QaMe0suGWewi2AjP4X9tI55All09seJrBQqcKTEig");
var pofile3=new ProfileDef("Rocker","te345st12","rocker@gmail.com","Male","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1gJrTqXMz_DO0hDOyo2cMMJ76hmIfrTMA5mCalphghLhxkTj");
var pofile4=new ProfileDef("Jacker","te5st12","jacker@gmail.com","Male","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlRriLVd11QaMe0suGWewi2AjP4X9tI55All09seJrBQqcKTEig");
var pofile5=new ProfileDef("Reeta","tes67t12","reeta@gmail.com","Female","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMqFbOPufHnWG7kvWHZysmcqJR3PJHgmYPioMlMJaJd9mjQB8J");
 //
 var profiles=[];
 profiles.push(pofile1);
 profiles.push(pofile2);
 profiles.push(pofile3);
 profiles.push(pofile4);
 profiles.push(pofile5);


app.get("/profiles",function(req,res) {
		 res.json(profiles);
});


//POST - Form --->>> In post data comes inside the body
//var username = req.query.username  can be used only for GET method due to header

var ProfileSchema=require('./entity/profile-schema');

app.post("/profiles",function(req,res) {
	console.log("@)@)@)#)cool!!!!!!!!!!!!!!");
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var gender = req.body.gender;
	var photo = req.body.photo;
	console.log("username= "+username);
	console.log("password= "+password);
	console.log("email= "+email);
	console.log("gender= "+gender);
	console.log("photo= "+photo);
	
	var pofile=new ProfileDef(username,password,email,gender,photo);
	
	var entity=new ProfileSchema();
	entity.username=username;
	entity.password=password;
	entity.email=email;
	entity.gender=gender;
	entity.photo=photo;
	
	entity.save(function(error,result) {
		if(error) {
			console.log(error);
		}else{
			profiles.push(pofile); ///I do not need this tomorrow
			var data={status:"success",message:"Hey! your profile has been uploaded successfully into the database!!!!!!!!!!!!!!!"};
			res.json(data);
		}
	}); //this will save data into the database
});

app.get("/fact",function(req,res) {
	var num = req.query.num;
	//req.getParameter("num");
	var sum=1;
	for(var x=2;x<=num;x++){
		sum=sum*x;
	}
	res.json({status:"success",result:"Factorial of "+num+" is "+sum});
});

app.get("/frog",function(req,res) {
    //creating JavaScript object in literal way
	var frog={name:"jacker",color:"green",price:34,location:"Fremont"};
	res.json(frog);  //res.json(frog);	 ->> first of all frog JavaScript is converted into JSON format and finally it is written into the response	
});


app.get("/greeting",function(req,res) {
	res.send("Hey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

app.get("/cool",function(req,res) {
	console.log("path ="+__dirname);
	//here we are forwarding 
	res.sendFile(__dirname+'/public/index.htm');
});


///#####################
//__dirname
app.use(express.static(path.join(__dirname, 'public')));

//Creating http server on port number 3000
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log("_@_@_@_@_Yeap my server is ready to handle to http request !!!!!!!!!!!!!!!!!!!!!!!");
  console.log("_@_@_@_@_Yeap my server is ready to handle to http request !!!!!!!!!!!!!!!!!!!!!!!");
  console.log("_@_@_@_@_Yeap my server is ready to handle to http request !!!!!!!!!!!!!!!!!!!!!!!");
});

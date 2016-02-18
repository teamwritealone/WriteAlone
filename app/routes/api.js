var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');

var superSecret = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
	var token=jsonwebtoken.sign({
		     _id:  user._id,
		    name:  user.name,
		username:  user.username
	},superSecret,{
		expiresInMinute:1440
	});
	return token;
}

module.exports = function(app,express/*,io*/){
	

	var api = express.Router();
	api.post('/signup',function(req,res){

		var user = new User({
			name:req.body.name,
			username:req.body.username,
			password:req.body.password
		});
		var token = createToken(user);
		user.save(function(err){
			if(err){ 
				res.send(err);
				return;
			}
			res.json({
				success:true,
				message:'user has been created!',
				token:token
			});
		});

	});

	api.get('/users',function(req,res){
		User.find({},function(err,users){
			if(err){
				res.send(err);
				return;
			}
			res.json(users);
		});

	});

/*

	api.post('/login',function(req,res){
		User.findOne({
			username:req.body.username
		}).select('username password').exec(function(err,user){
			if(err){
				throw err;
			}
			if(!user){
				res.send({message:"user does not exist"});
			}
			else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send("Not a valid password");
				}
				else{
					var token = createToken(user);
					res.json({
						success:true,
						message:"successfull Login!",
						token:token
					});
				}
			}
		});
	});


	api.use(function(req, res, next){
		console.log ("Somebody just come to our app!");
		var token = req.body.token || req.param('token')|| req.headers['x-access-token'];
		//if token exist
		if(token){
			jsonwebtoken.verify(token,superSecret,function(err,decoded){
				if (err){
					res.status(403).send({success:false, message:"Failed to authenticate user"});
				} else{
					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.status(403).send({success:false, message:"No token provided for the user"});
		}
	});

	api.route('/').post(function(req,res){
		var story = new Story({
			creator :req.decoded.id,
			content:req.body.content
		});
		story.save(function(err/*,newStory*){
			if(err){
				res.send(err);
				return;
			}
			res.json({message:"New story created !"})
		});
	})
	
	.get(function(req,res){
		Story.find({
			creator:req.decoded.id
		},
		function(err,stories){
			if(err){
				res.send(err);
				return;
			}
			res.json(stories);
		});
	});

	api.get('/me',function(req,res){
		res.json(req.decoded);
	});*/

	return api; /* without returning we get the following error.

		C:\Users\ejangpa\Desktop\userStory\node_modules\express\lib\router\index.js:458
	      throw new TypeError('Router.use() requires middleware function but got a ' + gettype(fn));
	      ^

		TypeError: Router.use() requires middleware function but got a undefined
	    at Function.use (C:\Users\ejangpa\Desktop\userStory\node_modules\express\lib\router\index.js:458:13)
	    at EventEmitter.<anonymous> (C:\Users\ejangpa\Desktop\userStory\node_modules\express\lib\application.js:219:21)
	    at Array.forEach (native)
	    at EventEmitter.use (C:\Users\ejangpa\Desktop\userStory\node_modules\express\lib\application.js:216:7)
	    at Object.<anonymous> (C:\Users\ejangpa\Desktop\userStory\server.js:22:5)
	    at Module._compile (module.js:413:34)
	    at Object.Module._extensions..js (module.js:422:10)
	    at Module.load (module.js:357:32)
	    at Function.Module._load (module.js:314:12)
	    at Function.Module.runMain (module.js:447:10)
	    at startup (node.js:139:18)
	    at node.js:999:3
	*/
}
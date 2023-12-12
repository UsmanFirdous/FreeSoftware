import express from 'express';
import multer from 'multer' ;
var app = express();
import layout from 'express-layout';
import validator from 'express-validator'
import bodyParser from 'body-parser'
app.use(bodyParser.json());
const urlencoded=app.use(bodyParser.urlencoded({ extended: false }));
import formidable from 'formidable';

import uniqueString from 'unique-string';

import fileUpload from 'express-fileupload';

import session from 'express-session';

import mysql from 'mysql';

  process.on('uncaughtException', function (err) {
	console.log("Error:",err);
  });  

  app.set('trust proxy', true);
  import { rateLimit } from 'express-rate-limit'

  const limiter = rateLimit({
	  windowMs: 1000, // 1 sec
	  limit: 10, // Limit each IP to 20 requests per `window` (here, per 0.5 sec)
	//   message:
	//   'Too many request from this IP, please try again', 
	  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	  // store: ... , // Use an external store for more precise rate limiting
	  handler: (req, res) => {
		res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
	  },
  })
  // Apply the rate limiting middleware to all requests
  app.use(limiter)
 // app.set('trust proxy', true);
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usaf"
});




con.connect(function(err) {
  if (err) throw err;
  console.log("Sql Connected! on query");
});


function makeid(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}






app.use(session({secret: 'shhhhhhared-secret',saveUninitialized: false,resave: true}));

app.use(function(req, res, next) {
	var ipAddress = req.ip;
	con.query("SELECT * FROM blockusers WHERE ipAddress= '"+ipAddress+"'", function (err, result) {
	//console.log("ip:",ipAddress);
	if(result.length<1){
	  next();
	  //console.log("IP is Good");
	} else {
		res.status(502).send(`
		<!DOCTYPE html>
		<html>
		<head>
		  <title>502 Bad Gateway</title>
		  <style>
			body {
			  font-family: Arial, sans-serif;
			  background-color: #f7f7f7;
			  margin: 0;
			  padding: 0;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  height: 100vh;
			  flex-direction: column;
			}
			.error-container {
			  text-align: center;
			  padding: 20px;
			  border-radius: 5px;
			  background-color: #ffffff;
			  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			}
			h1 {
			  font-size: 3em;
			  margin-bottom: 10px;
			  color: #d9534f;
			}
			p {
			  font-size: 1.2em;
			  color: #333333;
			}
			a {
			  color: #337ab7;
			  text-decoration: none;
			  font-weight: bold;
			}
		  </style>
		</head>
		<body>
		  <div class="error-container">
			<h1>502 Bad Gateway</h1>
			<p>Oops! Something went wrong on our end.</p>
			<p> <a href="/">Yor are not authorize to access any page</a>.</p>
		  </div>
		</body>
		</html>
	  `);
	}
   })
  });

  let picname;
var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		var dir='./public/Files/';
		callback(null, dir);
	},
	filename: function (req, file, callback) {
		
		if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'|| file.mimetype == 'image/png')
		{
		picname= makeid(9)+makeid(9)+file.originalname.toLowerCase().split(' ').join('-');
		callback(null , picname );
		}
		else
		{
			filename= makeid(9)+makeid(9) +file.originalname.toLowerCase().split(' ').join('-');
			callback(null , filename );
			}
	}
});	
var uploadimg = multer({ storage : storage}).single('img');



app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
import path from 'path';
import util from 'util';
import os from 'os';



app.use(bodyParser.urlencoded({extended : true}));


app.get('/admin_malik/ad_papular_soft', (req, res) => {
	if(req.session.name)
	{
		res.render('admin_malik/ad_papular_soft',{
			data: {},
		errors: {}
		});
	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
	
});

app.get('/admin_malik/admin_papular', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM papular ORDER BY Date DESC", function (err, result) {
			if (err) throw err;
			res.render('admin_malik/admin_papular',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.get('/admin_malik/admin_windows', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM windows ORDER BY Date DESC", function (err, result) {
			if (err) throw err;
			res.render('admin_malik/admin_windows',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.get('/admin_malik/admin_linux', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM linux ORDER BY Date DESC", function (err, result) {
			if (err) throw err;
			res.render('admin_malik/admin_linux',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.get('/admin_malik/logs', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM logs", function (err, result) {
			if (err) throw err;
			if(result.length>0)
			{
				result=result.reverse();
			}
			res.render('admin_malik/logs',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.get('/admin_malik/admin_mac', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM mac ORDER BY Date DESC", function (err, result) {
			if (err) throw err;
			res.render('admin_malik/admin_mac',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.get('/admin_malik/admin_android', (req, res) => {
	if(req.session.name)
	{
		con.query("SELECT * FROM android ORDER BY Date DESC", function (err, result) {
			if (err) throw err;
			res.render('admin_malik/admin_android',{
				Papular: result
				});
		
		});

	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});

app.post('/delete_record',function(req,res,next){
	if(req.session.name)
	{
		if(req.body.type=="logs")
		{
			con.query("DELETE FROM blockusers WHERE ipAddress=?",[
				req.body.ip
			], function (err, result) {
				if (err) throw err;
				console.log("record is deleted from blockusers");
			});
			con.query("DELETE FROM counter WHERE ipAddress=?",[
				req.body.ip
			], function (err, result) {
				if (err) throw err;
				console.log("record is deleted from counter");
			});
			con.query("DELETE FROM logs WHERE ipAddress=?",[
				req.body.ip
			], function (err, result) {
				if (err) throw err;
				console.log("record is deleted from logs");
				res.redirect('/admin_malik/logs');
			});
		}
		else if(req.body.type=="Papular")
		{
			con.query("DELETE FROM papular WHERE id=?",[
				req.body.id
			], function (err, result) {
				if (err) throw err;
				res.redirect('/admin_malik/admin_papular');
			
			});

		}
		else if(req.body.type=="Windows")
		{
			con.query("DELETE FROM windows WHERE id=?",[
				req.body.id
			], function (err, result) {
				if (err) throw err;
				res.redirect('/admin_malik/admin_windows');
			
			});

		}
		else if(req.body.type=="Linux")
		{
			con.query("DELETE FROM linux WHERE id=?",[
				req.body.id
			], function (err, result) {
				if (err) throw err;
				res.redirect('/admin_malik/admin_linux');
			
			});
			
		}
		else if(req.body.type=="Mac")
		{
			con.query("DELETE FROM mac WHERE id=?",[
				req.body.id
			], function (err, result) {
				if (err) throw err;
				res.redirect('/admin_malik/admin_mac');
			
			});
			
		}
		else if(req.body.type=="APK")
		{
			con.query("DELETE FROM android WHERE id=?",[
				req.body.id
			], function (err, result) {
				if (err) throw err;
				res.redirect('/admin_malik/admin_android');
			
			});
			
		}
	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});
app.post('/admin_malik/admin_update',function(req,res,next){
	if(req.session.name)
	{
		if(req.body.type=="Papular")
		{
			con.query("SELECT * FROM papular WHERE id=?",[
				req.body.id
			 ], function (err, found) {
			 res.render('admin_malik/admin_update',{
				Found:found,
				Type:"Papular",
				Data:''
			 })
			
			})
		}
		else if(req.body.type=="Windows")
		{
			con.query("SELECT * FROM windows WHERE id=?",[
				req.body.id
			 ], function (err, found) {
			 res.render('admin_malik/admin_update',{
				Found:found,
				Type:"Windows",
				Data:''
			 })
			
			})

		}
		else if(req.body.type=="Linux")
		{
			con.query("SELECT * FROM linux WHERE id=?",[
				req.body.id
			 ], function (err, found) {
			 res.render('admin_malik/admin_update',{
				Found:found,
				Type:"Linux",
				Data:''
			 })
			
			})
			
		}
		else if(req.body.type=="Mac")
		{
			con.query("SELECT * FROM mac WHERE id=?",[
				req.body.id
			 ], function (err, found) {
			 res.render('admin_malik/admin_update',{
				Found:found,
				Type:"Mac",
				Data:''
			 })
			
			})
			
		}
		else if(req.body.type=="APK")
		{
			con.query("SELECT * FROM android WHERE id=?",[
				req.body.id
			 ], function (err, found) {
			 res.render('admin_malik/admin_update',{
				Found:found,
				Type:"APK",
				Data:''
			 })
			
			})
			
		}
	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});

app.post('/icon_update', (req, res) => {
	if(req.session.name)
	{
	uploadimg(req,res,function(err) {
		let errors=[];
		if(err) {
			console.log("error");
					return res.end("first error Error uploading.");
			}
		if(req.body.type=="Windows")
		{
			con.query("UPDATE windows SET Icon=? WHERE id =?",[
				'Files/'+ picname,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM windows WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Windows",
						Data:"In Windows Category Image Record Successfully Updated"
					});
				
				});
				
			});


		}
		else if(req.body.type=="Linux")
		{
			con.query("UPDATE linux SET Icon=? WHERE id =?",[
				'Files/'+ picname,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM linux WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Linux",
						Data:"In Linux Category Image Record Successfully Updated"
					});
				
				});
				
			});


		}
		else if(req.body.type=="Mac")
		{
			con.query("UPDATE mac SET Icon=? WHERE id =?",[
				'Files/'+ picname,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM mac WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Mac",
						Data:"In Mac Category Image Record Successfully Updated"
					});
				
				});
				
			});

			
		}
		else if(req.body.type=="APK")
		{
			con.query("UPDATE android SET Icon=? WHERE id =?",[
				'Files/'+ picname,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM android WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"APK",
						Data:"In Android Category Image Record Successfully Updated"
					});
				
				});
				
			});

	
		}
		else if(req.body.type=="Papular")
		{
			con.query("UPDATE papular SET Icon=? WHERE id =?",[
				'Files/'+ picname,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM papular WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Papular",
						Data:"In Papular Category Image Record Successfully Updated"
					});
				
				});
				
			});

	
		}
		
		
		
		
		});


	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
});

app.post('/admin_record_update', (req, res) => {
	if(req.session.name)
	{

		if(req.body.type=="Papular")
		{
			con.query("UPDATE papular SET Title =?,Size=?,Version=? WHERE id =?",[
				req.body.title,
				req.body.size,
				req.body.version,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM papular WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Papular",
						Data:"In Papular Category Fields Record Successfully Updated"
					});
				
				});
				
			});

		}
		else if(req.body.type=="Windows")
		{
			con.query("UPDATE windows SET Title =?,Size=?,Version=?,Path=? WHERE id =?",[
				req.body.title,
				req.body.size,
				req.body.version,
				 req.body.link,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM windows WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Windows",
						Data:"In Windows Category Fields Record Successfully Updated"
					});
				
				});
				
			});

		}
		else if(req.body.type=="Linux")
		{
			con.query("UPDATE linux SET Title =?,Size=?,Version=?,Path=? WHERE id =?",[
				req.body.title,
				req.body.size,
				req.body.version,
				 req.body.link,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM linux WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Linux",
						Data:"In Linux Category Fields Record Successfully Updated"
					});
				
				});
				
			});
	

		}
		else if(req.body.type=="Mac")
		{
			con.query("UPDATE mac SET Title =?,Size=?,Version=?,Path=? WHERE id =?",[
				req.body.title,
				req.body.size,
				req.body.version,
				 req.body.link,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM mac WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"Mac",
						Data:"In Mac Category Fields Record Successfully Updated"
					});
				
				});
				
			});
		}
		else if(req.body.type=="APK")
		{
			con.query("UPDATE android SET Title =?,Size=?,Version=?,Path=? WHERE id =?",[
				req.body.title,
				req.body.size,
				req.body.version,
				 req.body.link,
				 req.body.id
			 ], function (err, f) {
				if (err) throw err;
				con.query("SELECT * FROM android WHERE id=?",[
					req.body.id
				],function (err, found) {
					if (err) throw err;
					res.render('admin_malik/admin_update',{
						Found:found,
						Type:"APK",
						Data:"In Android Category Fields Record Successfully Updated"
					});
				
				});
				
			});
		}
		
		
		
		
		
	}
	else
	{
		res.end("You have not permission to Access this page!");
	}


});

app.post('/admin_malik/admin_search', (req, res) => {
	if(req.session.name)
	{
	var query=req.body.title.split('');
	
	var check=0;
		for (var i=0;i<query.length;i++)
		{
			if(!((query[i]>='a' && query[i]<='z') || (query[i]>='A' && query[i]<='Z') || (query[i]>='0' && query[i]<='9') || (query[i]==' ')) )
			{
           check=1;
			}
		}
		if(check==1)
		{
			//console.log("ahhahaaaaaaaaaaaaaaa")
			res.render('admin_malik/admin_search',{
				Found:'',
				Type:req.body.type,
				Key:req.body.title
					});
		}

	if(req.body.type=="Windows")
	{			
		
				con.query("SELECT * FROM windows where Title LIKE ?",[
					'%'+req.body.title+'%'
					
				],function (err, found) {
					 console.log(found);
					res.render('admin_malik/admin_search',{
						Found:found,
						Type:req.body.type,
						Key:req.body.title
							});
						});
        

	}
	else if(req.body.type=="Linux")
	{
		con.query("SELECT * FROM linux where Title LIKE ?",[
			'%'+req.body.title+'%'
			
		],function (err, found) {
			 console.log(found);
			res.render('admin_malik/admin_search',{
				Found:found,
				Type:req.body.type,
				Key:req.body.title
					});
				});

	}
	else if(req.body.type=="Mac")
	{
		con.query("SELECT * FROM mac where Title LIKE ?",[
			'%'+req.body.title+'%'
			
		],function (err, found) {
			 console.log(found);
			res.render('admin_malik/admin_search',{
				Found:found,
				Type:req.body.type,
				Key:req.body.title
					});
				});
	}
	else if(req.body.type=="APK")
	{
		con.query("SELECT * FROM android where Title LIKE ?",[
			'%'+req.body.title+'%'
			
		],function (err, found) {
			 console.log(found);
			res.render('admin_malik/admin_search',{
				Found:found,
				Type:req.body.type,
				Key:req.body.title
					});
				});

	}
}
else
{
	res.end("You have not permission to Access this page!");
}
});


var middleware = [
  layout(),
	express.static(path.join('public')),
];
app.use(middleware);
import route from './routes.js';

app.use('/', route);

	app.listen(3001, function () {
		console.log('server started on port 3001');
	});
import express  from 'express'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import fs from 'fs';
const router = express.Router()
var app = express();
var check=0;
import log4js from "log4js";
var logger = log4js.getLogger();
logger.level = "debug";
import natural from 'natural';
import CryptoJS from 'crypto-js';
let ciphertext= "U2FsdGVkX1/pUknUtKEHtfMtG6SNo2eq5eqqVp21/2l5AISMMPwvKYHL0+/Y8Ojh";
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'MySecretKey');
var originalText = bytes.toString(CryptoJS.enc.Utf8); 
const reverSteganography = async (data) => {
    //MsYBd8ehLZW7plAORRF9Lw==
	//==WL9FRROAIp -> IPAORRF9LW==
	//7WZLhe8dBYsM -> MsYBd8ehLZW7

	//MsYBd8ehLZW7plAORRF9Lw==
	//IPAORRF9LW==MsYBd8ehLZW7
	
	//data=data.split('').reverse().join('');
	let length=data.length;
	let mid;
	if(length%2==0)
	mid=length/2;
    else
	mid=Math.floor(length/2)+1
	    let part1="";
		let part2="";
		let counter=0;
         for (let i=0;i<mid;i++)
		 {
              part1+=data[i];
			  counter++;
		 }
		 part1=part1.split('').reverse().join('');
		// console.log("part1:",part1);
		 for (let i=counter;i<length;i++)
		 {
              part2+=data[i];
		 }
		 part2=part2.split('').reverse().join('');
		// console.log("Part2:",part2);
      
	 return  part1+part2;
}
const steganography = async (data) => {
    //MsYBd8ehLZW7plAORRF9Lw==
	//==WL9FRROAIp -> IPAORRF9LW==
	//7WZLhe8dBYsM -> MsYBd8ehLZW7

	//MsYBd8ehLZW7plAORRF9Lw==
	//IPAORRF9LW==MsYBd8ehLZW7
	
	//data=data.split('').reverse().join('');
	let length=data.length;
	let mid;
	if(length%2==0)
	mid=length/2;
    else
	mid=Math.floor(length/2)+1
	    let part1="";
		let part2="";
		let counter=0;
         for (let i=0;i<mid;i++)
		 {
              part1+=data[i];
			  counter++;
		 }
		 part1=part1.split('').reverse().join('');
		 console.log("part1:",part1);
		 for (let i=counter;i<length;i++)
		 {
              part2+=data[i];
		 }
		 part2=part2.split('').reverse().join('');
		 console.log("Part2:",part2);
   
	 return  part1+part2;
}
const BlockchainBasedEncryption = async (data) => {
	try {
	const algorithm = 'aes-256-cbc';
	const key = crypto.scryptSync('my secret key', 'salt', 32);
	const iv = Buffer.alloc(16, 0);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(data, 'utf8', 'base64');
	encrypted += cipher.final('base64').toString();
	// logger.warn(encrypted); // outputs the encrypted data
	 return encrypted;
	}
	catch (error) {
        throw new Error('Encryption failed: ' + error.message);
    }
}	
const BlockchainBasedDecryption= async (encrypted)=>{
	try {
	const algorithm = 'aes-256-cbc';
	const div=Buffer.alloc(16, 0);
	const key = crypto.scryptSync('my secret key', 'salt', 32);
	const decipher = crypto.createDecipheriv(algorithm, key, div);
	let decrypted = decipher.update(encrypted, 'base64', 'utf8');
	decrypted += decipher.final('utf8');
	//logger.warn("Decrypted data:",decrypted) // outputs the decrypted data
	return decrypted
	}
	catch (error) {
        throw new Error('Encryption failed: ' + error.message);
    }
}
async function data ()
{
let encrypted = await BlockchainBasedEncryption("malik123");
logger.warn("encryption data:",encrypted);
let stegano=await steganography("MsYBd8ehLZW7plAORRF9Lwr==")
logger.debug("Stegnographic text:",stegano);
let reversStegano=await steganography(stegano)
logger.debug("encrypted text:",reversStegano);
let decrypt= await BlockchainBasedDecryption(encrypted);
 logger.debug("Dencrypted Password:",decrypt);
}
 data().catch(err => console.error(err))
// Function to find the closest match for a string in an array
function findClosestMatch(inputString, array) {
  let closestMatch = null;
  let minDistance = Infinity;

  array.forEach((element) => {
    const distance = natural.LevenshteinDistance(inputString, element);
    
    if (closestMatch === null || distance < minDistance) {
      minDistance = distance;
      closestMatch = element;
    }
  });

  if (closestMatch === null) {
    return { closestMatch, similarityPercentage: 0 };
  }

  const maxStringLength = Math.max(inputString.length, closestMatch.length);

  // Calculate similarity percentage
  const similarityPercentage = ((maxStringLength - minDistance) / maxStringLength) * 100;

  return { closestMatch, similarityPercentage: similarityPercentage.toFixed(2) };
}

// Example usage

let sql_Injection_Dataset=[
	"password' OR 1=1",
	"' OR '1'='1' --",
	"' OR '1'='1' /*",
	"' OR '1'='1' #",
	"' OR '1'='1' %00",
	"' OR '1'='1' %16"
];

logger.debug(originalText); // 'my message'
// let password= "abcabcabc1abcabcabc1abcabcabc132";
// let cryptoStr= "eyJjaXBoZXJ0ZXh0IjoiOWQwWG16UzQ5WExnWE9GVW1iaWVCeWc3Tzl5andUL3BjVWpnbFJTQW1Ecz0iLCJpdiI6Ijc1ZTg1NjkwYjhjNmJjMDIxZjA5YjU2NDI0NWY3YTA0Iiwic2FsdCI6IjIyOWQxNDJhYzliOTMzNzg5ODE0MTZlYzk0YTlhNDgzZWQwYjRjOGUyN2RlNDBkZTQzN2YyODQ3ZTdjMWQ3YmNlOTc0MDgxZWU2YWE1ZTI0NzBmMzQwNjJhYmJmZTg2YWM3ZTA0ODI1NjdmNzQ3ZDJiNjcwODliNDVkNzc1NzJlYWQxMTNkZjhhZDMwOTc0YzNhNzVkOWU2NzE4YmVmOWU3ODM4NjExM2UxNGQ0NjQ1MjliNjFiZWEzNDNkMGE0NWZlYmM5NmI1NGNmOGZjYmFkODBmNzdmMTkyNjM3NWVmMGU0MzZiNjdiNjYxZmUzY2Q4YWZjYTM1Mzc3ZjZkZTNmNmMwYWU1OTBiYjlmZjZmNDVlOGE3ODdhZTNkMjk1NjNhYzI2MzAwNDcyOWQ2ZTczZTBlNGM5NzRiZDQ0NzQyNWM4MzEwNjQwOGY2ZDcwYzRmYzFkZTVkZmUyYjczYWNiYTM2YzBkNzgxMmFlODQzNmE1MzliZDc5NzY5MWQxYzRjN2FjMDNlZTEyOTQwOWY5OGMxMGM2NDMyNDI2MWVjYjYyYmRjZTU2YmU0Nzg2MDkwZjE2Y2I1M2RlYTM2YmU1MTFlYmE2ZTNjMGU2MjQ3ZjNiM2UxNTI1NTkyNTMwYTQ0Njc4ZmJlNDIxNzQ2NGE5YTJkNzMxZDI5OGM5OGM5IiwiaXRlcmF0aW9ucyI6OTk5fQ=="
// var buf = new Buffer.from(cryptoStr, 'base64');

// var crypt = buf.toString('base64', 16);
// const iv = crypto.randomBytes(16);
// var decipher = crypto.createDecipheriv('aes-256-cbc', password, iv);
// decipher.setAutoPadding(false);
// var dec = decipher.update(crypt,'base64','utf-8');
// dec += decipher.final('utf-8'); 

// logger.debug('Decrypted content: ' + dec);


import mysql  from 'mysql';

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usaf"
});
con.connect(function(err) {
  if (err) throw err;
  logger.debug("Sql Connected! on router");
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
var gname="";
var myData=0;
var myData2=0;
import bodyParser  from 'body-parser'
import formidable from 'formidable';
import multer  from 'multer';
import uniqueString  from 'unique-string';
import path  from 'path';
var picname="";
var filename="";

// logger.error("Some debug messages");
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
var uploadpic = multer({ storage : storage}).array('uploadImage',2);
/////////////////////////////////////////////////////////////
 
/*var storaged =   multer.diskStorage({
	
	destination: function (req, file, callback) {
		var dir='./public/Files/' + req.body.title;
		callback(null, dir);
	},
	filename: function (req, file, callback) {
		filename='USAF.Com.PK_'+req.body.title + '.' + makeid(9) + '.zip';
	  // picname= gname + '.jpg';
		callback(null , filename );
	}
});	
var uploadfile = multer({ storage : storaged}).single('uploadfile');

*/


import { SuperfaceClient } from "@superfaceai/one-sdk";
import requestIp from 'request-ip';
//app.set("trust proxy", true);

const sdk = new SuperfaceClient();

async function run(ip) {
  // Load the profile
  const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");

  // Use the profile
  const result = await profile.getUseCase("IpGeolocation").perform(
    {
      ipAddress: ip
    },
    {
      provider: "ipdata",
      security: {
        apikey: {
          apikey: "0b67228961f1021e31d5302bd95bcee92003314289500bfdad4fee07"
        }
      }
    }
  );

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
	 
});


app.set('view engine', 'ejs');



var sess;
//app.set('trust proxy', true);
router.get('/', async (req, res) => {
	// let userdata= await run(req.ip);
    //  logger.debug("User Data:",userdata);
	// var clientIp = req.ip;
	// logger.debug("Your IP Address is",clientIp);
	con.query("SELECT * FROM windows ORDER BY Date DESC", function (err, result) {
		if (err) throw err;
		//logger.debug("Main API is calling");
		res.render('index',{
			Papular: result
			});
	});
	
});
router.post('/download', (req, res) => {
	
	
 con.query("SELECT * FROM windows WHERE Title=? LIMIT 1",[
  req.body.title
 ], function (err, windows) {
	if (err) throw err;
	con.query("SELECT * FROM linux WHERE Title=? LIMIT 1",[
		req.body.title
	 ], function (err, linux) {
		con.query("SELECT * FROM mac WHERE Title=? LIMIT 1",[
			req.body.title
		 ], function (err, mac) {
		
			con.query("SELECT * FROM android WHERE Title=? LIMIT 1",[
				req.body.title
			 ], function (err, android) {
				res.render('download',{
					Windows:windows,
					Apk:android,
					Linux:linux,
					Mac:mac,			
		});
	});
		
});
		
	});

});




});
router.get('/malik_shaf_login', (req, res) => {
	
	if(req.session.name)
	{
		res.redirect('/ad_papular_soft');
	}
	else
	{
	res.render('malik_shaf_login',{
	data: {},
	errors: {}
	});
}

});

router.post('/login_confirm',async function(req,res){
	const email = req.body.email;
	const password = req.body.password;
	var Emailbytes  = CryptoJS.AES.decrypt(email, 'MySecretKey');
	var Passwordbytes  = CryptoJS.AES.decrypt(password, 'MySecretKey');
    var originalEmail = Emailbytes.toString(CryptoJS.enc.Utf8);
	var originalPassword = Passwordbytes.toString(CryptoJS.enc.Utf8);
	logger.debug("Encrypted-Emial:",email);
	logger.debug("Encrypted-Password:",password);
	logger.debug("Original-Emial:",originalEmail);
	logger.debug("Original-Password:",originalPassword);
	let errors=[];
    
	if(!req.body.email){
		errors.push("Please Enter your Email Address");
	}
	if(!req.body.password){
		errors.push("Please Enter your password");
	}
	if(errors.length>0)
		{
			 res.render('malik_shaf_login',{
				 errors:errors,
				 
			 });
		}
		const result = findClosestMatch(originalPassword, sql_Injection_Dataset);
        var clientIp = req.ip;
		if(result.similarityPercentage >=80)
        {
			
			logger.error(`Attack Similarity Percentage: ${result.similarityPercentage}%`);
			let userdata= await run(clientIp);
			con.query("SELECT * FROM counter WHERE ipAddress= '"+clientIp+"'", function (err, result) {
            //   logger.debug("Counter Fetch Result:",result[0].ipAddress);
			if(result.length>0)
			{
				logger.warn("Client "+result.length+" Reocrd found in DB");
				if(result[0].actives==2)
				{//block the user
					con.query("UPDATE counter SET actives=? WHERE id =?",[
						Number(result[0].actives) + 1,
						result[0].id
					 ], function (err, f) {
						logger.warn("Active Updated by One");
					 }) 
					
					 var sql = "INSERT INTO `logs` (`ipAddress`, `addressCountryCode`, `addressCountry`, `addressRegion`, `addressLocality`, `postalCode`, `timeZone`, `latitude`, `longitude`) VALUES ('"+userdata.ipAddress+"', '"+userdata.addressCountryCode+"', '"+userdata.addressCountry+"', '"+userdata.addressRegion+"', '"+userdata.addressLocality+"', '"+userdata.postalCode+"', '"+userdata.timeZone+"', '"+userdata.latitude+"', '"+userdata.longitude+"')";
					 con.query(sql, function (err, r) {
						 if (err) throw err;
						 logger.debug("1 record inserted in User logs");
				    });
					 sql = "INSERT INTO `blockusers` (`ipAddress`) VALUES ('"+clientIp+"')";
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.debug("1 record inserted in blockusers");
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
				});
				}
				else
				{
					logger.warn("Limit not exceeded remaining tries=1");
					con.query("UPDATE counter SET actives=? WHERE id =?",[
						Number(result[0].actives) + 1,
						result[0].id
					 ], function (err, f) {
						logger.warn("Active Updated by One");
					 }) 
				}
			  }
			  else
			  {
				logger.debug("No client record found");
				let query ="INSERT INTO `counter` (`ipAddress`, `actives`) VALUES ('"+clientIp+"', '"+1+"')";
				con.query(query, function (err, result) {
				if (err) throw err;
				logger.debug("1 record inserted");
				logger.warn("Limit not exceeded remaining tries=2")
				});
			  }
			});
			logger.debug("User Data:",userdata);
			logger.debug("Your IP Address is",clientIp);
			let er=[];
			er.push("InValid Email Address/Password");
				res.render('malik_shaf_login',{
					errors:er,
				});

		}
		else
		{
			logger.warn(`Attack Similarity Percentage: ${result.similarityPercentage}%`);
		//logger.debug("Incomming Body:",req.body);
		con.query("SELECT * FROM admin", async function (err, result) {
			if (err) throw err;
			let er=[];
			let steganographicDBPassword= result[0].Password;
			logger.debug("steganographicDBPassword:",steganographicDBPassword);
			let encryptedPassword=await reverSteganography(steganographicDBPassword);
			logger.debug("encryptedPassword:",encryptedPassword);
			let decryptedPassword=await BlockchainBasedDecryption(encryptedPassword);
			logger.debug("decryptedPassword:",decryptedPassword);
			if(originalEmail==result[0].Email && originalPassword==decryptedPassword)
			{
				logger.debug("Password matched");
				req.session.name=result[0].Name;
				res.redirect('admin_malik/ad_papular_soft');
			
			}
			else
			{
				console.log("invalid password");
				er.push("InValid Email Address/Password");
				res.render('malik_shaf_login',{
					errors:er,
				});
                return;
			}
		});
	   }
	});

	router.get('/admin_malik/logout',(req,res) => {
		if(req.session.name)
		{
			req.session.destroy((err) => {
				if(err) {
						return logger.debug(err);
				}
				res.redirect('../malik_shaf_login');
		});
		}
	});





router.get('/contact', (req, res) => {
	
	res.render('contact',{
		data: {},
	errors: {}
	});

});
router.post('/success', (req, res) => {
	
	var transporter = nodemailer.createTransport({
		host: 'usaf.com.pk',
    port: 465,
    secure: true,
		auth: {
			user: 'alert@usaf.com.pk',
			pass: 'h.+VczkLpF)Rs,,gcg'
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	var mailOptions = {
		from: 'Alert@usaf.com.pk',
		to: 'sagarvivian@gmail.com',
		subject: 'Query/Message/Support',
		html:'<h1>Welcome to Usaf Support!</h1><h2>Name: <span style="color:#fb6340">'+req.body.name+'</span></h2><h2>Email: <span style="color:#fb6340">'+req.body.email+'</span></h2><h2>Address: <span style="color:#fb6340">'+req.body.address+'</span></h2><h2>Query: <span style="color:#fb6340">'+req.body.query+'</span></h2>'

	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			logger.debug(error);
		} else {
			logger.debug('Email sent: ' + info.response);
		}
	});

	res.render('success',{
		data: 'Thanku So Much For Contact Us,Your Query successfully Received we will contact with you as soon as possible.',
	errors: {}
	});

});
router.get('/overview', (req, res) => {
	logger.debug("Client Id:",req)
	res.render('overview',{
		data: {},
	errors: {}
	});

});
router.get('/custom', (req, res) => {
	
	res.render('custom',{
		data: {},
	errors: {}
	});

});
router.get('/register_admin', (req, res) => {
	
	res.render('register_admin',{
		data: {},
	errors: {}
	});

});
router.post('/register_admin_confirm', async (req, res) => {
	let errors=[];
	if(!req.body.name)
	{
      errors.push("Please Enter Your Name!");
	}
	else if(!req.body.email)
	{
		errors.push("Please Enter Your Name!");
	}
	else if(!req.body.pass)
	{
		errors.push("Please Enter Your Name!");
	}
	if(errors.length>0)
	{
		logger.debug(errors);
		res.render('register_admin',{
		errors: errors
		});
		
	} 
    const encryptedPassword= await BlockchainBasedEncryption(req.body.pass);
    const StegnoGraphictext= await steganography(encryptedPassword);
	let sql="INSERT INTO `admin` (`Name`, `Email`, `Password`) VALUES ('"+req.body.name+"', '"+req.body.email+"', '"+StegnoGraphictext+"')";
	var e=[];
	con.query(sql, function (err, result) {
		if (err) throw err;
		logger.debug("1 record inserted");
		if (err>0)
		{
			e.push(err);
			return res.end(err);
		}
		else
		{
		//	e.push("Record Succesfully Saved in MongoDb");
			return res.end("Admin Successfully Addedd into Mongodb");
		}
				
});

   
	  
	

});
router.get('/windows', (req, res) => {
	
	con.query("SELECT * FROM windows ORDER BY Date DESC", function (err, result) {
		if (err) throw err;
		res.render('windows',{
			Windows: result
			});
	});
});
router.get('/download_windows/:id', (req, res) => {
	
	
	con.query("SELECT * FROM windows WHERE uid=? LIMIT 1",[
		req.params.id
	 ], function (err, found) {
		//logger.debug(windows[0].Path);
		res.redirect(found[0].Path)
	});

})
router.get('/download_mac/:id', (req, res) => {
	
	con.query("SELECT * FROM mac WHERE uid=? LIMIT 1",[
		req.params.id
	 ], function (err, found) {
		//logger.debug(windows[0].Path);
		res.redirect(found[0].Path)
	});

})
router.get('/download_linux/:id', (req, res) => {
	
	con.query("SELECT * FROM linux WHERE uid=? LIMIT 1",[
		req.params.id
	 ], function (err, found) {
		//logger.debug(windows[0].Path);
		res.redirect(found[0].Path)
	});	

})
router.get('/download_android/:id', (req, res) => {
	
	con.query("SELECT * FROM android WHERE uid=? LIMIT 1",[
		req.params.id
	 ], function (err, found) {
		//logger.debug(windows[0].Path);
		res.redirect(found[0].Path)
	});	

})

router.post('/search', (req, res) => {
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
			//logger.debug("ahhahaaaaaaaaaaaaaaa")
			res.render('search',{
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
					 logger.debug(found);
					res.render('search',{
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
			 logger.debug(found);
			res.render('search',{
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
			 logger.debug(found);
			res.render('search',{
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
			 logger.debug(found);
			res.render('search',{
				Found:found,
				Type:req.body.type,
				Key:req.body.title
					});
				});

	}
});
router.get('/mac', (req, res) => {
	
	con.query("SELECT * FROM mac ORDER BY Date DESC", function (err, result) {
		if (err) throw err;
		res.render('mac',{
			Mac: result
			});
	});
});
router.get('/linux', (req, res) => {
	
	con.query("SELECT * FROM linux ORDER BY Date DESC", function (err, result) {
		if (err) throw err;
		res.render('linux',{
			Linux: result
			});
	});
});

router.get('/autocomplete/', (req, res) => {
	var regex= new RegExp(req.query["term"],'i');

	var filter=Windows.find({Title:regex},{'Title':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);
 filter.exec(function(err,data){
 
	var result=[];
	if(!err){
		if(data && data.length && data.length>0){
			data.forEach(user=>{
				let obj={
					id:user._id,
					label: user.Title
				};
				result.push(obj);
			});
		}
		logger.debug(result);
		res.jsonp(result);
	}

 });

});
router.get('/android', (req, res) => {
	
		
			con.query("SELECT * FROM android ORDER BY Date DESC", function (err, result) {
				if (err) throw err;
				res.render('android',{
					Apk: result
					});
			});
});


router.post('/upload_papular', (req, res) => {

	if(req.session.name)
	{

	new formidable.IncomingForm().parse(req, (err, fields, files) => {
		 
		let errors=[];
		if (err) {
      console.error('Error', err)
      throw err
		}
			logger.debug(files);
		if(!fields.title){
			errors.push("Please Enter title");
		}
		if(!fields.version){
			errors.push("Please Enter version");
		}
		if(!fields.size){
			errors.push("Please Enter size");
		}
		if(!fields.type){
			errors.push("Please select type");
		}
		
		if(errors.length>0)
		{
			logger.debug(errors);
			
			return res.end("Plz Fill All Fields")
		}
		
	});
 
	uploadpic(req,res,function(err) {
		let errors=[];
		if(err) {
			logger.debug("error");
					return res.end("first error Error uploading file.");
			}
		
		//logger.debug('The filename is ' + res.req.file.filename);
		
		logger.debug(filename);
		logger.debug(picname);
		var today = new Date();
	var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
	var title=req.body.title;
	var version=req.body.version;
	var size=req.body.size;
	var icon = 'Files/' + picname;
	var d= date;
	var path = req.body.link;
			if(req.body.type=="Windows")
			{
				con.query("SELECT * FROM papular ORDER BY Date DESC", function (err, result) {
					if (err) throw err;
					//logger.debug(result[1].id);
						if(result.length==10)
						{
							var sql = "DELETE FROM papular WHERE Title = '"+result[result.length-1].Title+"'";
              con.query(sql, function (err, result) {
							if (err) throw err;
							logger.debug("10 record deleted");
							});
							
							var sql = "INSERT INTO papular (uid, Title,Icon,Size,Version,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+d+"')";
							con.query(sql, function (err, result) {
								if (err) throw err;
								logger.debug("1 record inserted");
						});
							
						}
						else
						{
							var sql = "INSERT INTO papular (uid, Title,Icon,Size,Version,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+d+"')";
							con.query(sql, function (err, result) {
								if (err) throw err;
								logger.debug("1 record inserted");
						});

						}
				});
				
				
				var sql = "INSERT INTO windows (uid, Title,Icon,Size,Version,Path,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+path+"','"+d+"')";
				con.query(sql, function (err, result) {
					if (err) throw err;
					logger.debug("1 record inserted");
					return res.end("Record Succesfully Saved in Database Please refresh the page");
			
			});
			
	
			}
			else if(req.body.type=="Linux")
			{
				
					var sql = "INSERT INTO linux (uid, Title,Icon,Size,Version,Path,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+path+"','"+d+"')";
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.debug("1 record inserted");
						return res.end("Record Succesfully Saved in Database Please refresh the page");
					});
				
			}
			else if(req.body.type=="Mac")
			{
				
					
					var sql = "INSERT INTO mac (uid, Title,Icon,Size,Version,Path,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+path+"','"+d+"')";
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.debug("1 record inserted");
						return res.end("Record Succesfully Saved in Database Please refresh the page");
					});
			
			}
			else if(req.body.type=="APK")
			{
				
					var sql = "INSERT INTO android (uid, Title,Icon,Size,Version,Path,Date) VALUES ('"+uniqueString()+"','"+title+"','"+icon+"','"+size+"','"+version+"','"+path+"','"+d+"')";
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.debug("1 record inserted");
						return res.end("Record Succesfully Saved in Database Please refresh the page");
				
				});
			}
			

	});
	}
	else
	{
		res.end("You have not permission to Access this page!");
	}
	
});


export default router;   
//module.exports = router
const express = require("express");
const bodyParser= require ("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get("/", function(req, res)
{

	res.sendFile(__dirname + "/signup.html" );



});




app.post("/", function(req, res)

{

var Fname= req.body.Fname;
var Lname= req.body.Lname;
var mail= req.body.Email;

const data = {

	members: [

	{
		email_address: mail,
		status: "subscribed",
		merge_fields: {
			FNAME: Fname,
			LNAME: Lname,


		}
	}



	]
};

const jsonData = JSON.stringify(data);

const url="https://us1.api.mailchimp.com/3.0/lists/3eff90380e"

const options =
{

	method: "POST",
	auth: "teja:409158db088d535f052651bc0d26e5ad-us1"

}


const request =   https.request(url, options, function(response) 
{

if (response.statusCode === 200)
{
	res.sendFile(__dirname + "/suc.html");
}
else 

{
	res.sendFile(__dirname + "/fail.html");
}




response.on("data", function(data)
{

	console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();


app.post("/suc", function(req, res){

	res.redirect("/")
} )

app.post("/fail", function(req, res)
{

	res.redirect("/")
})


});


app.listen(process.env.PORT ||  3000, function() 
{

	console.log("at 3000");
});





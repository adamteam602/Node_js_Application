const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var path = require('path');


// app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended : false}),express.static(__dirname))

var mysql = require('mysql');
const e = require('express');
app.use('/images', express.static(__dirname + 'images'))

var con = mysql.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "Abhi@123",
  database: "Skill_DataBase_Project"
});

const port = 3000
app.listen(port,start)

function start(){
    console.log("This app is listening on port 3000")
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
flag = true;


con.connect(function (err) {
    if
      (err)
      console.log(err);
    else
      console.log("Connected!");



  })


// Addskill
app.post('/create_contact', (req, res) => {
  console.log("Data Successfully sent from html to server");
  var name = req.body.name1;
  var skill = req.body.skill;
  var YOE = req.body.YOE;
  var skill_level = req.body.Skill_Level;
  var Domain = req.body.Domain;
  
	console.log(name+" "+skill+" "+YOE+" "+skill_level + " "+Domain)
//   AddSkill(name,skill,skill_level,YOE,Domain)
	console.log("ABHi")
   bret = AddSkill(name,skill,skill_level,YOE,Domain)
   AddUserSkill(name,skill)
   console.log(bret);
  if( flag == false)
  {
	console.log(flag)
	res.send("Already Username Created")
  }
  
  
  else
  	res.sendFile(__dirname + '/thank.html', 'utf8');
  
})


function AddSkill(name, skill,level,yoe,Domain)
{
	
	var sql = "SELECT 1 FROM   information_schema.tables WHERE  table_schema = 'Skill_DataBase_Project' " +
		" AND table_name = '" + name + "';" ;
		console.log(sql)
	con.query(sql, function (err, result, fields) {
		if (err) 
			flag = false;

		if(result.length != 0)
		{
			flag = false;
			// return false;
			console.log("Abhi");
			console.log("You have already added the skill if you want to change go update skill tab");
			return false;
		}
		else
		{
			flag = true
			var sql = "CREATE TABLE `"+ name +"` (skill VARCHAR(45), Domain VARCHAR(45),skill_level varchar(45),Experience INT)";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Table created");
			});

			sql = "INSERT INTO `" + name +"` (skill,Domain,skill_level,Experience )VALUES ?";
			var values = [[skill,Domain,level, yoe]];
			con.query(sql, [values], function (err, result) {
				if (err)
				  console.log(err)
				else
				  console.log("Inserted Succeffully");
			})
			return true;
		} 

	});
	console.log("ABhi")
}
 // To Store all user skills
function AddUserSkill(name,skill)
{
	sql = "INSERT INTO Allskills (skill,Name)VALUES ?";
		var values = [[skill,name]];
		con.query(sql, [values], function (err, result) {
			if (err)
				console.log(err)
			else
				console.log("Inserted Succeffully");
		})
}

function DeleteUserSkill(skill)
{
	sql = "Delete from Allskills where skill='"+skill+"';";
	con.query(sql, function (err, result) {
		if (err)
			console.log(err)
		else
			console.log("Deleted Succeffully");
	})

}

// Update Skill

app.post('/updateskill', function(req, res) {
	var name = req.body.name1;
	var skill = req.body.skill;
	var yoe = req.body.YOE;
	var level = req.body.Skill_Level;
	var Domain = req.body.Domain;
	AddUserSkill(name,skill);
	sql = "INSERT INTO `" + name +"` (skill,Domain,skill_level,Experience )VALUES ?";
	  var values = [[skill,Domain,level, yoe]];
	  con.query(sql, [values], function (err, result) {
		  if (err){
			  res.send("You Have Already Added This Skill Try Another One !!!")
			  throw err
		  }
		  else{
			  res.sendFile(__dirname + '/thankupdate.html', 'utf8');
			  console.log("Inserted Succeffully");
		  }
	  })
	
  });

  // Delete Skill
  app.post('/deleteskill',function(req,res){
	var name = req.body.name1;
	var skill = req.body.skill;

	DeleteSkill(name,skill);
	DeleteUserSkill(skill);
	res.sendFile(__dirname + '/thankdelete.html', 'utf8');


  });

  function DeleteSkill(name,skill)
  {
	sql = "Delete from `"+name+"` where skill= '"+skill+"';"
	con.query(sql, function (err, result) {
		if (err){
			console.log("You Have not Added This Skill Try Another One !!!")
			throw err
		}
		else{
			
			console.log("Deleted Succeffully");
		}
	})

  }
  
// Show List  

  app.post('/skill_list', function(req, res) {
	var fname = req.body.fname;
	var lname = req.body.lname;
	console.log(fname+" "+lname);
    var sql="SELECT * FROM "+"`"+fname+" "+lname+"`";
	console.log(sql);
	ShowSkill(fname,lname)
	// if( == false)
	// {
	// 	res.send("No Such Username Added If You Want to add go to add skill on Home Page");
	// }
    con.query(sql, function (err,data) {
    if (err) 
		res.send("No Such Username Added If You Want to add go to add skill on Home Page");
		// throw err;
	
	res.render('skill_list', { data : data});
	// res.send(result)
  });
});

 
function ShowSkill(fname,lname)
{
	schema_name = "Skill_DataBase_Project";
	table_name  = fname+" "+lname;
	flag1 = true;

	// var sql = `select TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' and TABLE_SCHEMA="Skill_DataBase_Project"` ; 
	var sql = "SELECT 1 FROM   information_schema.tables WHERE  table_schema = 'Skill_DataBase_Project' " +
		" AND table_name = '" + table_name + "';" ;
		console.log(sql)
	flag = true;
	con.query(sql, function (err, result, fields) {
	if (err) {
		throw err+"Username is Not Present"; 
		console.log("Absent");
		flag1 = false;
	}

	if(result.length != 0)
	{
		
		console.log("Present");
		
	}
	else
	{
		console.log("Absent")
		flag1 = false;
	} 

	});
	return flag1;
}

// Show Peoples with Similar Skills

app.post('/showpeoples',function(req,res){
	var skill = req.body.skill;
	var sql="SELECT Name FROM Allskills where skill='"+skill+"'";
	console.log(sql)
	con.query(sql, function (err,data) {
		if (err) 
			res.send("No Such Username Added If You Want to add go to add skill on Home Page");
			// throw err;
		
		res.render('people_list', { data : data});


	}) 
});






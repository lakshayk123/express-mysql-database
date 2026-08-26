import { faker } from '@faker-js/faker';
import mysql2 from 'mysql2'
import express from 'express';
import path from 'path';
import methodOverride from 'method-override';

const app = express();
const port =8080;

app.set("view engine","ejs");
app.set("views",path.join(import.meta.dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname,"public")));
app.use(methodOverride("_method"));

const connection = mysql2.createConnection({
  host:"localhost",
  user:"root",
  database:"sigmaSql",
  password:"Lakshay@123"
});

 let getRandomUser = ()=> {
   return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
   ];
 }
// let q= "INSERT INTO  user (id,username,email,password) VALUES ?";
// let users=[[8,"boby","1223@gmail.com","lakshay12"]];

// we have already inserted 100 user that's why i have comment it out! this loop
// let data=[];
// for(let i=0;i<100;i++){
//   let user=getRandomUser();
//   data.push(user);
// }



app.listen(port,()=>{
  console.log(`server is listening to port ${port} `);
})



app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";

  connection.query(q, (err, result) => {
  if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }
  console.log(result);
    let count = result[0]["COUNT(*)"];

    res.render("home.ejs", { count });//after rendering sql connection get lost and no need to write connection.end ()here
  });
});

app.get("/user",(req,res)=>{
  let q = "SELECT id,username,email FROM user";

connection.query(q, (err, result) => { // connection.query is async in nature
  if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }

  let users = result;  // user is an array of multiple objects
  res.render("showuser.ejs",{users});
  });

})

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  console.log(id);// id is not string here 
  let q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q,[id],(err,result)=>{
    let user = result[0];
    res.render("edit.ejs",{user});
  })
})



// update db



app.patch("/user/:id",(req,res)=>{
let {id} = req.params;
let q = "select * from user where id = ?";
let {password: formPass , username: newusername}=req.body;
connection.query(q,[id],(err,result)=>{
  if (err) {
        console.log(err);
        return res.send("Database error");
    }

  let user= result[0];
  if(formPass != user.password){
    res.send("wrong pass");
  }else{
    let q2 = `UPDATE user SET username = ? WHERE id = ?`;
    connection.query(q2,[newusername,id],(err,result)=>{
      if (err) {
        console.log(err);
        return res.send("Database error");
    }
      res.redirect("/user");
  })
  }
})
})


//add user 
app.get("/user/add",(req,res)=>{
  res.render("add.ejs");
})

app.post("/user",(req,res)=>{
  let {id,username,password,email}=req.body;
  let q = `INSERT INTO user (id, username, email, password) values (?,?,?,?)`;
  let user =[id,username,email,password];
  connection.query(q, user, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.redirect("/user");
  });
})

//delete user 
app.get("/user/:id/del",(req,res)=>{
  let {id} = req.params;

let q = "select * from user where id = ?";
connection.query(q,[id],(err,result)=>{
  if (err) {
        console.log(err);
        return res.send("Database error");
    }
  let user= result[0];
  res.render("del.ejs",{user});
})
})

app.delete("/user/:id",(req,res)=>{
  let {id}= req.params;
let {email,password:formPass}=req.body;
let q = `select * from user where id= ?`;
connection.query(q,[id],(err,result)=>{
  if (err) {
      console.log(err);
      return res.send(err);
    }
let user = result[0];
if(user.password != formPass){
      return res.send("wrong pass");
}else{
  let q2=`DELETE FROM user WHERE id = ?;`;
connection.query(q2,[id],(err,result)=>{
  if (err) {
      console.log(err);
      return res.send("wrong pass");
    }
    res.redirect("/user");
})
}
})
})






















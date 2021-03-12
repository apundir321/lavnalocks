const express= require('express');
// const cors= require('cors');
const path = require('path');
const bodyParser= require('body-parser');
const MongoClient= require('mongodb').MongoClient;
const ObjectID= require('mongodb').ObjectID;
// var multer  = require('multer')
// var fs= require('fs');
const PORT = 3000;



const app= express();


app.get('/', (req, res) => {
    res.send("hellooooooooooooo");
  
});


const client = new MongoClient("mongodb://localhost:27017/ols", { useNewUrlParser: true,  useUnifiedTopology: true });
let olsdbclient;

client.connect((err,db)=>{
    if(!err)
         {
              olsdbclient=db;
         }
         else{
             console.log(err);
         }

})




// app.use(cors());
// app.use(express.static(path.join(__dirname,'uploads')));



// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null,"temp.jpg")
//     }
//   })
//   var upload = multer({ storage: storage })


  

app.post('/api/register',bodyParser.json() ,(req,res)=>{
    res.render("register");
    const collection = olsdbclient.db('ols').collection("users");

    collection.insertOne(req.body, (err,r)=>{
        console.log("result of insert is -> " +r.ops[0]);
        console.log("result of insert is _id -> " +r.insertedId);
        if(!err)
       {
        res.send({msg:"sucessfully inserted", status:'OK', description:'all ok'});
       
       }
       else{
        res.send({msg:" not inserted", status:'Failed', description:'error in monogo db'});
       }

    });
    
})




app.post('/api/login',bodyParser.json() ,(req,res)=>{
    
    const collection = olsdbclient.db('ols').collection("users");
    
    collection.findOne({'email':req.body.email, 'password':req.body.password}, (err,docs)=>{
        if(!err && docs)
        {
            console.log(docs);
             res.send({msg:"sucessfully Logged In", status:'OK', description:docs});
        }
    });
    
    })
    

    
    

app.listen(3000, ()=>{
    console.log("listing on port 3000")
})
const express = require('express')
const path = require('path');
const app = express();
// const bodyparser=require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cruddb', { useNewUrlParser: true });
const port = 8000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//define mongoose schema
var crudSchema = new mongoose.Schema(
    {
        city1: String, city2: String
    }
);
var Crud = mongoose.model('Crud', crudSchema);



app.get("/", (req, res) => {
    params = {title:'crud app',content:'welcome to crud app'};
    res.render('crud.pug', params);
})
var id={};
app.get('/getdetails',(req,res) =>{
   
    Crud.find({}).then(( allDetails)=>{
        res.render("crud.pug", { details: allDetails });
       
    }).catch(()=>{
        console.log("err");
    });
  });

app.get('/getremove',(req,res)=>{
   
    Crud.deleteMany({}).then(()=>{
        // res.render('crud.pug');
        res.redirect('/');
    }).catch(()=>{
        console.log("err");
    });
    // Crud.deleteOne({'_id'=id}).then(()=>{
    //     res.render('crud.pug');
    // }).catch(()=>{
    //     console.log("err");
    // });
})

app.post("/crud", (req, res) => {
    var myData=new Crud(req.body);
    console.log(myData._id);
    id=myData._id;
    myData.save().then(()=>{
        res.redirect('/');
        // res.send("this form has been submitted");//here can use alert instead send
    }).catch(()=>{
        res.status(400).send("form is not saved");
    });
    
})



app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
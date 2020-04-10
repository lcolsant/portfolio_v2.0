const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//database require and connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio', {useNewUrlParser: true});
mongoose.connection.on('connected', ()=>console.log('Connected to MongoDB...'));

//db Schema and Model
var MessageSchema = new mongoose.Schema ({

      
  name:{
      type:String,
      required:[true, 'You must provide a name'],
      trim:true,
      minlength:3
    },
  
  email:{
      type:String,
      required:[true, 'You must provide an email'],
      unique:true,
      trim:true,
      // validate: {
      //   validator: () => Promise.resolve(false),
      //   message: 'Email validation failed'
      // }
    },
  
  message:{
      type:String,
      required:[true, 'You must provide a message'],
      trim:true
    },
  },
  {
    timestamps: true,
  });

mongoose.model("Message", MessageSchema);
var Message = mongoose.model("Message")

//static files
app.use(express.static(path.join(__dirname)));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//routes
app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'index.ejs'));
  res.render('index');

});

 
app.post('/contact', function(req,res){

  let errors = false;

  const nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
  const emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

  if(nameRegex.test(req.body.name)){
    console.log('valid name');
  }else{
    console.log('invalid name');
    errors = true;
  }

  if(emailRegex.test(req.body.email)){
    console.log('valid email');
  }else{
    console.log('invalid email');
    errors = true;
  }

  let escapedMessage = escapeRegExp(req.body.message)
  console.log(escapedMessage);

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
  }
  

  
  if(errors){
    console.log('posted data contains errors. not saved to DB')
    res.render('index');

  }else{

    var message = new Message ({
      name:req.body.name,
      email:req.body.email,
      message:escapedMessage,
      
    });

    message.save(function(err){
      if(err){
        console.log('data not saved to db');
      }else{
      console.log('successfully added a message!');
      //res.redirect('/');
      res.render('index');
      }
    });
  }

});

app.listen(port, function(){
    console.log(`listening on port ${port}.`);
});


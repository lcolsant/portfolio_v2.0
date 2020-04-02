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
      trim:true
    },
  
  email:{
      type:String,
      required:[true, 'You must provide an email'],
      trim:true
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



//routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', function(req,res){

  
  var message = new Message ({
    name:req.body.name,
    email:req.body.email,
    message:req.body.message,
  });

  message.save(function(err){
    if(err){
      console.log('data not saved to db');
    }else{
     console.log('successfully added a message!');
     res.redirect('/');
    }
  });

});

app.listen(port, function(){
    console.log(`listening on port ${port}.`);
});


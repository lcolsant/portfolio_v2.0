//database require and connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
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
module.exports = mongoose.model("Message")

//alternative export
// var Message = mongoose.model("Message", MessageSchema);
// exports.Message = Message;

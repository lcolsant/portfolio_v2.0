
require('../database/database.js');

const Message = require('mongoose').model('Message');

//alternative import
// db = require('../database/database.js');
// const Message = db.Message;


module.exports = function Route(app){


    //routes
    app.get('/', function(req, res) {
        //res.sendFile(path.join(__dirname, 'index.ejs'));
        res.render('index');

    });


    app.post('/contact', function(req,res){

        let errors = false;

        const nameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        const emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

        console.log(`Name: ${req.body.name}`);
        console.log(`Email: ${req.body.email}`);

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
            //res.render('index');
            res.redirect('/');

        }else{

        var message = new Message ({
            name:req.body.name,
            email:req.body.email,
            message:escapedMessage,
            
        });

        message.save(function(err){
            if(err){
                console.log('valid data, error attempting to save to db');
            }else{
                console.log('successfully added a message!');
                res.redirect('/');
                //res.render('index');
            }
        });
        }
    });
}
    
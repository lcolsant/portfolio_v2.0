const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


//static files
app.use(express.static(path.join(__dirname)));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


require('./routes/routes.js')(app);


app.listen(port, function(){
    console.log(`listening on port ${port}.`);
});


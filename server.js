const express = require('express');
const path = require('path');
const app = express();
//const port = process.env.PORT || 8000;

//relaod require
app.set('port', process.env.PORT || 8000)
const http = require('http');
//const reload = require('reload')


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


//static files
app.use(express.static(path.join(__dirname)));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//routes
require('./routes/routes.js')(app);



// app.listen(port, function(){
//     console.log(`listening on port ${port}.`);
// });


// Reload development code here
const server = http.createServer(app);
server.listen(app.get('port'), () => console.log('Server listening on port ' + app.get('port') ));
//reload(app);




//Install express server
const express = require('express');
const path = require('path');

const app = express();
var cors = require('cors')

// app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
});


// Serve only the static files form the dist directory
app.use(express.static("./dist"));

app.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);

// const express = require('express');  
// const app = express();  
// app.use(express.static(__dirname + '/dist'));  
// app.all('*', (req, res) => {  
//   res.status(200).sendFile(__dirname + '/dist/index.html');  
// });  
// app.listen(process.env.PORT || 8070);
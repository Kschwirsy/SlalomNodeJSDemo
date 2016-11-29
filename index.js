var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');
var busboy = require('connect-busboy');
var formidable = require('formidable');
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var upload = multer({ dest: '/tmp/' });

app.set('port', (process.env.PORT || 5000))

/*GET Requests */
app.get('/', function(request, response) {
  console.log("Received a GET request at:"+new Date());
  response.send('Hello GET!')
})

app.get('/process_post', function(req, resp){
  res.sendFile(__dirname + "/" + "process_post.htm");
})

app.get('/process_get.htm', function(req, resp){
  res.sendFile(__dirname + "/" + "process_get.htm");
})

app.get('/file_upload.htm', function(req, resp){
  res.sendFile(__dirname + "/" + "file_upload.htm");
})

app.get('/list_user', function(request, response) {
  console.log("Received a GET request for list_user at:"+new Date());
  response.send('User Listing')
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
   console.log("Got a GET request for /ab*cd");

   res.send('Page Pattern Match');
})

/*POST Requests */
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

/* Form Actions*/

app.get('/process_get', function(req ,resp){
     //Prepare response in JSON format
     response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
     }
     console.log("Received a GET request to 'process_post'");
     console.log(response);
     resp.end(JSON.stringify(response))
   })

app.post('/process_post', urlencodedParser, function(req, resp){
     //Prepare JSON format output
     response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
     };
     console.log("Received a POST request to 'process_post'");
     console.log(response);
      resp.end(JSON.stringify(response));
   })

   app.post('/', function(){
     console.log("Received a POST requestrequest at:"+new Date());
     response.send("Hello POST");
   })

app.post('/file_upload', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/tmp');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
})


//temp message

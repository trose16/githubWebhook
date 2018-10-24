const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const childProcess = require('child_process');
const githubUsername = 'trose16';

//middleware / routing
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// redirect homepage to the form-with-get route
app.get('/', function(request, response){
  return response.redirect('/get-str-form');
});
// render the get-str-form
app.get('/get-str-form', function(request, response){
  return response.render('get-str-form');
});
// render the post-str-form
app.get('/post-str-form', function(request, response){
  return response.render('post-str-form');
});
// handle the submission of get-str-form when submit button is pressed
app.get('/submit-get-str-form', function(request, response){
  console.log(`READ THE GET REQUEST!!!! ${JSON.stringify(request.query)}`);
  return response.send(request.query);
})
// handle the submission of post-str-form when submit button is pressed
app.post('/submit-post-str-form', function(request, response){
  console.log(`READ THE POST REQUEST!!!! ${JSON.stringify(request.body)}`);
  return response.send(request.body);
})

// GITHUB WEBHOOK
app.post("/webhooks/github", function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;

    if(branch.indexOf('master') > -1 && sender.login === githubUsername){
        deploy(res);
    }
});

function deploy(res){
    childProcess.exec('cd /home && ./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
};


// set up the server on a port
app.listen(3000, function(){
  console.log('Hello from server on port 3000');
});

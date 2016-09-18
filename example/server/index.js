var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var index = 3;
var posts = [
  {
    name: 'fer',
    points:[{color:'#FF0000', index:10}],
    index:0
  },
  {
    name: 'fer2',
    points:[{color:'#00FF00', index:12}],
    index:1
  },
  {
    name: 'fer3',
    points:[{color:'#00FF00', index:50}, {color:'#00FF00', index:52}],
    index:3
  }
];

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getData', (req, res) => {
  var index = (posts.length - req.query.index)-1;

  if(index < 0){
    res.send({
      lastItem:true
    })
  }else{
    res.send(posts[index])
  }
});

app.post('/postData', (req, res) => {

  var name = req.body.name;
  var points = req.body.points;

  posts.push({name:name, points:points, index:index});
  index++;

  res.send('ok');
});


app.listen('3000', function(err){
  if(err) {
    console.log(err);
    return;
  }
  console.log('Server listening at http://localhost:3000');
});

const config = require('./config.js');

const recastai = require('recastai');
const express = require('express');

const app = express();
const client = new recastai.Client(config.DEVELOPER_ACCESS_TOKEN, 'en');

var myConversationToken = null;


app.get('/', function(controReq, controRes) {
  myConversationToken = null;

  controRes.render('interface.ejs');
});


app.get('/get', function(controReq, controRes) {

  var q = controReq.query.q ? controReq.query.q : "";

  client.textConverse(q, { conversationToken: myConversationToken })
  .then(function(res) {

    // store the conversationToken
    myConversationToken = res.conversationToken;

    controRes.write(JSON.stringify(res.replies))

    controRes.end();

  }).catch(function(err) {
    console.log(err);
    controRes.end("Error");
  })
});

app.listen(8080);
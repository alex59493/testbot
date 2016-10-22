const config = require('./config.js');

const recastai = require('recastai');
const express = require('express');

const app = express();
const client = new recastai.Client(config.DEVELOPER_ACCESS_TOKEN, 'en');

var myConversationToken = null;


app.get('/', function(controReq, controRes) {
  controRes.render('interface.ejs');
});


app.get('/send', function(controReq, controRes) {

  var q = controReq.query.q ? controReq.query.q : "";

  client.textConverse(q, { conversationToken: myConversationToken })
  .then(function(res) {

    // store the conversationToken
    myConversationToken = res.conversationToken;

    // get the action from the response
//    var action = res.action;
//    if (action && action.done) {
//      // ...make a call to a weather API
//      console.log("action " + action.slug + " is done.");
//    }

    controRes.end(JSON.stringify(res));

  }).catch(function(err) {
    console.log(err);
    controRes.end(JSON.stringify({ "error": err }));
  })
});

app.listen(8080);
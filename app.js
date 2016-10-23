const config = require('./config.js');

const recastai = require('recastai');
const express = require('express');

const app = express();
const client = new recastai.Client(config.DEVELOPER_ACCESS_TOKEN, 'en');

var myConversationToken = null;


app.get('/', function(controReq, controRes) {
  controRes.render('interface.ejs');
});


app.get('/get', function(controReq, controRes) {

  var q = controReq.query.q ? controReq.query.q : "";

  client.textConverse(q, { conversationToken: myConversationToken })
  .then(function(res) {

    // store the conversationToken
    myConversationToken = res.conversationToken;

    // get the action from the response
    var action = res.action;
    if (action && action.done && action.slug === 'gender') {
      // ...make a call to an API
      console.log("SELECT meilleurs résultats FOR age = " + res.memory.age.value + "and gender = " + res.memory.gender.value)
    }

    controRes.end(JSON.stringify(res));

  }).catch(function(err) {
    console.log(err);
    controRes.end("Error");
  })
});

app.listen(8080);
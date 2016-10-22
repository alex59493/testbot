const config = require('./config.js');
const recastai = require('recastai');
const express = require('express');

const app = express();
const client = new recastai.Client(config.DEVELOPER_ACCESS_TOKEN, 'en');

var myConversationToken = null;


app.get('/query/:q', function(controReq, controRes) {

  client.textConverse(controReq.params.q, { conversationToken: myConversationToken })
  .then(function(res) {
    console.log(JSON.stringify(res, null, 4));

    // store the conversationToken
    myConversationToken = res.conversationToken;

    // get the next reply your bot can respond
    var reply = res.reply();

    /*
    // get the action from the response
    var action = res.action

    // if the action is done...
    if (action && action.done) {
      // ...make a call to a weather API
      console.log("action " + action.slug + " is done.")
    }
    */

    controRes.render('result.ejs', {reply: reply});

  }).catch(function(err) {
    controRes.render('result.ejs', {reply: "Sorry, I didn't understand..."});
  })
});

app.listen(8080);



/*

client.textConverse(my_text, { conversationToken: myConversationToken })
  .then(function(res) {

  // store the conversationToken
  myConversationToken = res.conversationToken

  // get the next reply your bot can respond
  var reply = res.reply()
  console.log(reply)

  // get the action from the response
  var action = res.action

  // if the action is done...
  if (action && action.done) {
    // ...make a call to a weather API
    console.log("action " + action.slug + " is done.")
  }

  }).catch(function(err) { 
    // handle the error  
  })
  */
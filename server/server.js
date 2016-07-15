const express = require('express');
const app = express();

const API_KEYS = require('../API_KEYS');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const Twitter = require('twitter');
const twitter = new Twitter({
  consumer_key: API_KEYS.TWITTER.consumer_key,
  consumer_secret: API_KEYS.TWITTER.consumer_secret,
  access_token_key: API_KEYS.TWITTER.access_token_key,
  access_token_secret: API_KEYS.TWITTER.access_token_secret,
});

app.get('/api/tweets', (req, res) => {
  'use strict';
  let username = req.query.username;
  let params = {screen_name: username, exclude_replies: true};

  twitter.get('statuses/user_timeline', params, (err, tweets, response) => {
    if (!err) {
      let arr = [];

      tweets.forEach( (tweet) => {
        arr.push(tweet.text);
      });

      res.json({
        tweets: arr,
      });

    } else {
      console.log(err)
    }
  });
});


app.listen(3000, () => {
  console.log('Match code challenge API server listening on 3000');
});



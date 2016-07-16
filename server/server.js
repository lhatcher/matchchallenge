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

var indico = require('indico.io');
indico.apiKey = API_KEYS.INDICO_API_KEY;


// This endpoint grabs the most recent tweets for a specified username
// using Twitter's API, and then determines personality type using Indico's
// Natural Language Processing API.
app.get('/api/tweet_analysis', (req, res) => {
  'use strict';
  let username = req.query.username;
  let params = {screen_name: username, exclude_replies: true};

  twitter.get('statuses/user_timeline', params, (err, tweets, response) => {
    if (!err) {
      let tweetData = [];

      tweets.forEach( (tweet) => {
        tweetData.push(tweet.text);
      });

      // create object to store average weight of each persona
      let personas = {};

      indico.batchPersonas(tweetData).then( (personaData) => {
        // create initial key value pairs
        console.log(personaData[0])

        for ( let persona in personaData[0] ) {
          personas[persona] = 0;
        }

        // iterate through batch output
        personaData.forEach( (persona) => {
          // iterate through each persona value
          for ( let type in persona ) {
            // update running total
            personas[type] = personas[type] + persona[type];
          }
        });
        console.log(personas);

      }).then( () => {
        // get largest value
        let MBTI_type = '';
        let max = 0;
        Object.keys(personas).forEach( type => {
          MBTI_type = personas[type] > max ? type : MBTI_type;
          max = Math.max(personas[type], max);
        });

        res.json({
          personalityType: MBTI_type,
          tweets: tweetData,
        });
      });


    } else {
      console.log(err)
    }
  });
});





app.listen(3000, () => {
  console.log('Match code challenge API server listening on 3000');
});



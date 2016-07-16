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
// using Twitter's API, and then determines personality type and sentiment 
// using Indico's Natural Language Processing API.
app.get('/api/tweet_analysis', (req, res) => {
  'use strict';
  let username = req.query.username;
  let params = {screen_name: username, exclude_replies: true, include_rts: false};

  twitter.get('statuses/user_timeline', params, (err, tweets, response) => {
    if (!err) {
      let tweetData = [];

      tweets.forEach( (tweet) => {
        tweetData.push(tweet.text);
      });

      let sentiment = '';
      indico.batchSentiment(tweetData).then( sentimentValues => {
        let average = sentimentValues.reduce( (a,b) => a + b) / sentimentValues.length;
        sentiment = average > 0.5 ? 'positive' : 'negative';
      });

      // create object to store average weight of each persona
      let personas = {};

      indico.batchPersonas(tweetData).then( (personaData) => {
        // create initial key value pairs
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
      }).then( () => {
        // get largest value
        let MBTI_type = '';
        let max = 0;
        Object.keys(personas).forEach( type => {
          MBTI_type = personas[type] > max ? type : MBTI_type;
          max = Math.max(personas[type], max);
        });

        res.json({
          user: username,
          personalityType: MBTI_type,
          sentiment: sentiment,
          tweets: tweetData,
        });
      });


    } else {
      console.log(err)
    }
  });
});


// RETURNS DUMMY DATA TO PRESERVE LIMITED API CALLS
app.get('/api/dummy', (req, res) => {
  console.log('called!')
  res.json({
    user: 'realDonaldTrump',
    personalityType: 'protagonist',
    sentiment: 'positive',
    tweets: [
      "Congrats Carla Hayden, our newest Librarian of Congress! Her confirmation is certainly one for the history books.\nhttps://t.co/5T8rvSRp9e",
      "Incredible! After a 5-year journey, we're up close and personal with our solar system's largest planet. Welcome to Jupiter, @NASAJuno!",
      "Happy Fourth of July, everybody! And to our brave men and women in uniform: On this day and every day, we thank you.",
      "Elie Wiesel was a great moral voice of our time and a conscience for our world. He was also a dear friend. We will miss him deeply.",
      "Proud to sign laws to improve transparency and avert a crisis in Puerto Rico. I'd hoped to use my pen more often before Congress left town.",
      "Until next time, Justin. Good to know that Canada and the world will benefit from your leadership for years to come. https://t.co/T10g64niul",
      "Every woman has a constitutional right to make her own reproductive choices. I'm pleased to see the Supreme Court reaffirm that fact today.",
      "Thank you John Lewis for leading on gun violence where we need it most. https://t.co/vctfqAH5Wt",
      "By giving him its highest rating, the American Bar Association confirms what we all know: Judge Garland should serve on the Supreme Court.",
      "Gun violence requires more than moments of silence. It requires action. In failing that test, the Senate failed the American people.",
      "What a game and what a series for the @Cavs. Happy to see @KingJames bring it home for Cleveland!",
      "Happy Father's Day to all the dads out there. Glad to be spending this one with my family in Yosemite. https://t.co/SaNJgmoIK1",
      "He shook up the world, and the world's better for it. Rest in peace, Champ. https://t.co/z1yM3sSLH3"
    ]
  })
});



app.listen(3000, () => {
  console.log('Match code challenge API server listening on 3000');
});



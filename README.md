# Twitter Persona Analyzer

This application gives a basic analysis of a user's Twitter activity. The analysis includes sentiment and MBTI personality type in the following format: 

> Based on the following recent tweets, @[username] is a [positive/negative] [personality type].

### Tech

This project uses the following technologies and APIs:
* React
* Redux
* axios
* Bootstrap
* Node.js / Express
* Webpack
* Babel
* Twitter API
* Indico API (for sentiment analysis and personality detection)

### Installation

Assuming Node.js is already installed, simply run the following:
```sh
$ npm install
```
You will need to run Webpack to create the bundle, then start the dev server on port 8000:
```sh
$ webpack
$ npm run start
```
Additionally, you will need your own API keys from Twitter and Indico. In the root directory, create a file called API_KEYS.js (already gitignored) containing the following module:
```
module.exports = {
  INDICO_API_KEY: '/* YOUR INFO HERE */',
  TWITTER: {
    consumer_key: '/* YOUR INFO HERE */',
    consumer_secret: '/* YOUR INFO HERE */',
    access_token_key: '/* YOUR INFO HERE */',
    access_token_secret: '/* YOUR INFO HERE */',
  },
};
```

The final step is starting the Node.js server on port 3000. In a new terminal window:
```
$ nodemon server/server.js
```
or use this if automatic restart is not preferred
```
$ node server/server.js
```



import axios from 'axios';

export const getAnalysisByUsername = (username) => {
  
  // const endpoint = `http://localhost:3000/api/tweet_analysis?username=${username}`;
  const endpoint = `http://localhost:3000/api/dummy?username=${username}`;

  const request = axios.get(endpoint).catch( (err) => {
    console.log('An error occured while fetching analysis. ');
  });

  return {
    type: 'FETCH_ANALYSIS',
    payload: request,
  };
};
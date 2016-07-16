import React from 'react';

import Tweet from './Tweet';


class Feed extends React.Component {
  render() {

    return(
      <div className='feed'>
        <h5 className="analysis">
          Based on the following recent tweets, <span className="screen-name">@{this.props.user}</span> is a <span className={this.props.sentiment}>{this.props.sentiment}</span> <strong>{this.props.personality}</strong>
        </h5>
        
        {this.props.tweets.map( (tweet, i) => <Tweet text={tweet} key={i} /> )}
      </div>
    );
  }
}

export default Feed;
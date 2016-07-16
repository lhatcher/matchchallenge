import React from 'react';


class Tweet extends React.Component {

  render() {
    return (
      <div className="tweet">
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Tweet;
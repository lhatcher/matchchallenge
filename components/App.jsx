import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnalysisByUsername } from '../actions/getAnalysisByUsername';

require('../styles/styles.css');

import Feed from './Feed';


class App extends React.Component {

  analyze() {
    let username = this.refs['username'].value;
    if(username.length > 0) {
      this.props.getAnalysis(username);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Twitter Persona Analysis</a>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h3>Created by Liam Hatcher</h3>
            <p className="text-info">This application will determine the MBTI type and general positivity/negativity of a person based on their most recent activity on Twitter. Enter someone's twitter user name and click the button to load an analysis, followed by their most recent tweets! </p>
            <form action="javascript:void(0)" id="userForm" onSubmit={this.analyze.bind(this)}>
              <div className="row">
                <div className="col-sm-9">
                  <input className="form-control" type="text" name='twitteruser' placeholder="Enter a Twitter user" ref="username"/>
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="btn btn-success btn-block">Get Analysis</button> 
                </div>
              </div>
            </form>

            { this.props.user ? <Feed {...this.props} /> : null }

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.analysis.user,
    personality: state.analysis.personalityType,
    sentiment: state.analysis.sentiment,
    tweets: state.analysis.tweets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAnalysis: getAnalysisByUsername,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);








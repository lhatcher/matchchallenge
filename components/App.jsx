import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnalysisByUsername } from '../actions/getAnalysisByUsername';

let username = '';

class App extends React.Component {

  analyze() {
    username = this.refs['username'].value;
    this.props.getAnalysis(username);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Match React Code Example - Liam Hatcher</a>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h3>Twitter Persona Analysis</h3>
            <p>This application will determine the MBTI type and general positivity/negativity of a person based on their most recent activity on Twitter.</p>
            <form action="javascript:void(0)" id="userForm" onSubmit={this.analyze.bind(this)}>
              <div className="row">
                <div className="col-sm-9">
                  <input className="form-control" type="text" name='twitteruser' placeholder="Enter a Twitter user" ref="username"/>
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="btn btn-primary btn-block">Get Analysis</button> 
                </div>
              </div>
            </form>

            <h5>@{this.props.user} is a {this.props.sentiment} {this.props.personality}</h5>


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








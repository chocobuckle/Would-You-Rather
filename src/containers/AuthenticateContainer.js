import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Authenticate } from 'components';
import * as usersActionCreators from 'ducks/users';
import { bindActionCreators } from 'redux';

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: bool.isRequired,
    fetchAndHandleAuthedUser: func.isRequired
  };

  handleAuth = (e) => {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.props.history.replace('results'));
  }

  render() {
    return (
      <div>
        <Authenticate
          onAuth={this.handleAuth}
          isFetching={this.props.isFetching}
        />;
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const { isFetching } = users;
  return {
    isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);

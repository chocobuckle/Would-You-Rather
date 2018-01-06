import React, { Component } from 'react';
import { oneOfType, func, number, string, arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from 'config/constants';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from 'ducks/users';
import { formatUserInfo } from 'helpers/utils';
import { connect } from 'react-redux';

class MainContainer extends Component {
  static propTypes = {
    removeFetching: func.isRequired,
    children: arrayOf(object.isRequired).isRequired,
    fetchingUserSuccess: func.isRequired,
    history: oneOfType([
      number.isRequired,
      string.isRequired,
      func.isRequired,
      object.isRequired
    ]).isRequired
  };

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user === null) {
        this.props.removeFetching();
      } else {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
        this.props.history.replace('results');
      }
    });
  }

  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(MainContainer));

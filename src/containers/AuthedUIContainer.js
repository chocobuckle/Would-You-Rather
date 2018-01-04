import React, { Component } from 'react';
import { AuthedUI } from 'components';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActionCreators from 'ducks/modal';

class AuthedUIContainer extends Component {
  static propTypes = {
    openModal: func.isRequired
  };

  handleNewDecisionClick = (e) => {
    e.preventDefault();
    this.props.openModal();
  }

  render() {
    return (
      <AuthedUI handleNewDecisionClick={this.handleNewDecisionClick} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...modalActionCreators
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthedUIContainer);

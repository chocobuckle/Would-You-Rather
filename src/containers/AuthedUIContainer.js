import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { AuthedUI } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActionCreators from 'ducks/modal';

class AuthedUIContainer extends Component {
  static propTypes = {
    modalIsOpen: bool.isRequired,
    openModal: func.isRequired
  };

  handleNewDecisionClick = (e) => {
    e.preventDefault();
    this.props.openModal();
  }

  handleModalSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <AuthedUI
        handleNewDecisionClick={this.handleNewDecisionClick}
        handleModalSubmit={this.handleModalSubmit}
        modalIsOpen={this.props.modalIsOpen}
      />
    );
  }
}

function mapStateToProps({ modal }) {
  return {
    modalIsOpen: modal.modalIsOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...modalActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthedUIContainer);

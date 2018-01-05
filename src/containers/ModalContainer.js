import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { Modal } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActionCreators from 'ducks/modal';

class ModalContainer extends Component {
  static propTypes = {
    modalIsOpen: bool.isRequired,
    closeModal: func.isRequired
  };

  state = {
    title: '',
    firstDecision: '',
    secondDecision: ''
  }

  handleInputText = (whichInput, text) => {
    return this.setState({
      [whichInput]: text
    });
  }

  handleModalSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
  }

  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <Modal
        title={this.state.title}
        firstDecision={this.state.firstDecision}
        secondDecision={this.state.secondDecision}
        handleInputText={this.handleInputText}
        handleModalSubmit={this.handleModalSubmit}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

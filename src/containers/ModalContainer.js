import React, { Component } from 'react';
import { bool, func, string, shape } from 'prop-types';
import { Modal } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActionCreators from 'ducks/modal';
import { formatDecision } from 'helpers/utils';

class ModalContainer extends Component {
  static propTypes = {
    modalIsOpen: bool.isRequired,
    closeModal: func.isRequired,
    title: string.isRequired,
    firstDecision: string.isRequired,
    secondDecision: string.isRequired,
    updateDecisionText: func.isRequired,
    userInfo: shape({
      name: string,
      uid: string
    }).isRequired,
    saveAndCloseModal: func.isRequired
  };

  handleInputText = (whichInput, text) => {
    this.props.updateDecisionText(whichInput, text);
  }

  handleModalSubmit = (e) => {
    e.preventDefault();
    const { title, firstDecision, secondDecision, userInfo, saveAndCloseModal } = this.props;
    const decision = formatDecision(title, firstDecision, secondDecision, userInfo);
    saveAndCloseModal(decision);
  }

  isSubmitDisabled = (firstDecision, secondDecision, title) => {
    return firstDecision.length <= 0
      || firstDecision.length > 140
      || secondDecision.length <= 0
      || secondDecision.length > 140
      || title.length <= 0
      || title.length > 140;
  }

  render() {
    const { modalIsOpen, closeModal, title, firstDecision, secondDecision } = this.props;
    return (
      <Modal
        title={title}
        firstDecision={firstDecision}
        secondDecision={secondDecision}
        handleInputText={this.handleInputText}
        handleModalSubmit={this.handleModalSubmit}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        isSubmitDisabled={this.isSubmitDisabled}
      />
    );
  }
}

function mapStateToProps({ modal, users }) {
  const { modalIsOpen, title, firstDecision, secondDecision } = modal;
  const userInfo = users[users.authedID] ? users[users.authedID].info : {};
  return {
    modalIsOpen,
    title,
    firstDecision,
    secondDecision,
    userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...modalActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

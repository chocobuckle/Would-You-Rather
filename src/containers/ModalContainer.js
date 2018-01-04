import React, { Component } from 'react';
import { bool } from 'prop-types';
import { Modal } from 'components';
import { connect } from 'react-redux';

class ModalContainer extends Component {
  static propTypes = {
    modalIsOpen: bool.isRequired
  };

  handleModalSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Modal
        modalIsOpen={this.props.modalIsOpen}
        handleModalSubmit={this.handleModalSubmit}
      />
    );
  }
}

function mapStateToProps({ modal }) {
  return {
    modalIsOpen: modal.modalIsOpen
  };
}

export default connect(mapStateToProps)(ModalContainer);

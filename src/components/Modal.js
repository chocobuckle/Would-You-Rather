import React from 'react';
import { bool, func } from 'prop-types';
import { default as ReactModal } from 'react-modal';

ReactModal.setAppElement('body');

Modal.propTypes = {
  modalIsOpen: bool.isRequired,
  handleModalSubmit: func.isRequired
};

function Modal({ modalIsOpen, handleModalSubmit }) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel='New Decision Modal'>
      <button onClick={handleModalSubmit} >YEAHHHH!!!!</button>
    </ReactModal>
  );
}

const customStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
};

export default Modal;

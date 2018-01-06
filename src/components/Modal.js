import React from 'react';
import { bool, string, func } from 'prop-types';
import { default as ReactModal } from 'react-modal';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';

ReactModal.setAppElement('body');

Modal.propTypes = {
  title: string.isRequired,
  firstDecision: string.isRequired,
  secondDecision: string.isRequired,
  handleInputText: func.isRequired,
  handleModalSubmit: func.isRequired,
  modalIsOpen: bool.isRequired,
  closeModal: func.isRequired,
  isSubmitDisabled: func.isRequired
};

function Modal({
  title,
  firstDecision,
  secondDecision,
  handleInputText,
  handleModalSubmit,
  modalIsOpen,
  closeModal,
  isSubmitDisabled
}) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      contentLabel='New Decision Modal'>
      <Wrapper>
        <Header>Would you rather...<CloseButton onClick={closeModal}>X</CloseButton></Header>
        <InputWrapper>
          <Title
            placeholder='Title'
            maxLength={70}
            value={title}
            onChange={(e) => handleInputText('title', e.target.value)}
          />
          <TextArea
            placeholder='First Decision'
            value={firstDecision}
            maxLength={140}
            onChange={(e) => handleInputText('firstDecision', e.target.value)}
          />
          <Or>OR</Or>
          <TextArea
            placeholder='Second Decision'
            value={secondDecision}
            maxLength={140}
            onChange={(e) => handleInputText('secondDecision', e.target.value)}
          />
          <SubmitButton
            disabled={isSubmitDisabled(firstDecision, secondDecision, title)}
            onClick={handleModalSubmit}>Submit
          </SubmitButton>
        </InputWrapper>
      </Wrapper>
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    backgroundColor: '#ebebeb',
    margin: '0 auto',
    padding: 0,
    width: '20em',
    height: '23.8em'
  }
};

const Title = styled.input`
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.4em;
  width: 100%;
`;

const TextArea = styled.textarea`
  font-family: sans-serif;
  font-size: 1rem;
  height: 6em;
  margin: 0.5em auto;
  padding: 0.4em 0.5em;
  resize: none;
  width: 100%;
`;

const Or = styled.span`
  font-size: 1.25rem;
  color: #a4a4a4;
  font-family: sans-serif;
  font-weight: 100;
`;

const Header = styled.h2`
  ${blueFont}
  background-color: white;
  margin: 0;
  padding: 0.4em 0.5em;
  width: 100%;
`;

const CloseButton = styled.span`
  cursor: pointer;
  float: right;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = Wrapper.extend`
  padding: 0.5em;
`;

const SubmitButton = styled.button`
  background-color: #4a90e2;
  border-radius: 0.2em;
  border-style: 0;
  border-style: none;
  color: white;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 100;
  padding: 0.5em 2em;
  transition: background-color 0.1s;

  &:hover {
    background-color: #1877e6;
  }

  &:disabled {
    background-color: #c6c6c6;
  }
`;

export default Modal;

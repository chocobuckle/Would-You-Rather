import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { Loading } from 'components';

FacebookAuthButton.propTypes = {
  isFetching: bool.isRequired,
  onAuth: func.isRequired
};

function FacebookAuthButton({ isFetching, onAuth }) {
  return (
    <Button
      onClick={onAuth}>
      {isFetching === true
        ? <Loading />
        : 'Login With Facebook'}
    </Button>
  );
}

const Button = styled.button`
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: #4867aa;
  border-radius: 0.2em;
  width: 11em;
  height: 1.75em;
`;

export default FacebookAuthButton;

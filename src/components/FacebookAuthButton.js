import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

FacebookAuthButton.propTypes = {
  isFetching: bool.isRequired,
  onAuth: func.isRequired
};

function FacebookAuthButton({ isFetching, onAuth }) {
  return <Button onClick={onAuth}>{isFetching === true ? 'Loading...' : 'Login With Facebook'}</Button>;
}

const Button = styled.button`
  width: 7em;
  border-radius: 0.5em;
`;

export default FacebookAuthButton;

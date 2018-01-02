import React from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';
import FacebookAuthButton from './FacebookAuthButton';

Authenticate.propTypes = {
  isFetching: bool.isRequired,
  onAuth: func.isRequired
};

function Authenticate({ isFetching, onAuth }) {
  return (
    <Wrapper>
      <Header>Authenticate</Header>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 6rem;
  ${blueFont}
  margin-bottom: 0.335em;
`;

export default Authenticate;

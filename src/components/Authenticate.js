import React from 'react';
import {  } from 'prop-types';
import FacebookAuthButton from './FacebookAuthButton';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';

Authenticate.propTypes = {

};

function Authenticate({ isFetching, onAuth }) {
  return (
    <div>
      <Header>Authenticate</Header>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
    </div>
  );
}

const Header = styled.h1`
  font-size: 8rem;
  ${blueFont}
`;

export default Authenticate;

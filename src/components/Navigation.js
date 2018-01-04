import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';
import  { AuthedUIContainer } from 'containers';

Navigation.propTypes = {
  isAuthed: bool.isRequired
};

function Navigation({ isAuthed }) {
  return (
    <Wrapper isAuthed={isAuthed}>
      <RouterLink to='/'>Home</RouterLink>
      { isAuthed
        ? <AuthedUIContainer />
        : <AuthRouterLink to='/auth'>Authenticate</AuthRouterLink>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ isAuthed }) =>  isAuthed === true ? 'justify-content: space-between' : null};
  display: flex;
  margin: 1em auto 0;
  width: 70%;
`;

export const RouterLink = styled(Link)`
  ${blueFont};
  margin-top: 0.3em;
  font-size: 1.5rem;
  text-decoration: none;
`;

const AuthRouterLink = RouterLink.extend`
  margin-left: 0.75em;
`;

export default Navigation;

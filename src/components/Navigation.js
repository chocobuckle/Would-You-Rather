import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';

Navigation.propTypes = {
  isAuthed: bool.isRequired
};

function AuthedUI() {
  return (
    <div>
      <NewDecision>New Decision</NewDecision>
      <RouterLink to='/logout'>Logout</RouterLink>
    </div>
  );
}

function Navigation({ isAuthed }) {
  return (
    <Wrapper isAuthed={isAuthed}>
      <RouterLink to='/'>Home</RouterLink>
      { isAuthed
        ? <AuthedUI />
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

const NewDecision = styled.button`
  background-color: #4a90e2;
  border-radius: 0.25em;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  margin-right: 1em;
  padding: 0.2em 0.3em;
`;

const RouterLink = styled(Link)`
  ${blueFont};
  margin-top: 0.3em;
  font-size: 1.5rem;
  text-decoration: none;
`;

const AuthRouterLink = RouterLink.extend`
  margin-left: 0.75em;
`;

export default Navigation;

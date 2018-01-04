import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { ModalContainer } from 'containers';
import { RouterLink } from './Navigation';

AuthedUI.propTypes = {
  handleNewDecisionClick: func.isRequired
};

function AuthedUI({ handleNewDecisionClick }) {
  return (
    <div>
      <NewDecision onClick={handleNewDecisionClick}>New Decision
        <ModalContainer />
      </NewDecision>
      <RouterLink to='/logout'>Logout</RouterLink>
    </div>
  );
}

const NewDecision = styled.button`
  background-color: #4a90e2;
  border-radius: 0.25em;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  margin-right: 1em;
  padding: 0.2em 0.3em;
`;

export default AuthedUI;

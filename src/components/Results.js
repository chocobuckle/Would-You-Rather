import React from 'react';
import { bool, shape, string, number } from 'prop-types';
import styled from 'styled-components';
import { Spinner } from 'components';
import { formatTimestamp } from 'helpers/utils';

Results.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  decisions: shape({
    title: string,
    user: shape({
      name: string,
      uid: string
    }),
    timestamp: number,
    userHasRepliedToThisDecision: bool,
    firstDecision: shape({
      text: string,
      selectedCount: number
    }),
    secondDecision: shape({
      text: string,
      selectedCount: number
    })
  }).isRequired
};

function Results({ isFetching, decisions, error }) {
  if (isFetching) return <Spinner />;
  const sortedDecisionsArray = Object.values(decisions).sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  return (
    <Wrapper>
      <Header>Decisions</Header>
      {
        error
          ? (
            <ErrorMsgWrapper>
              {/* eslint-disable react/no-unescaped-entities */}
              <ErrorMsg>Ah, feck!</ErrorMsg>
              <ErrorMsg>Looks like we have a problem.</ErrorMsg>
              <ErrorMsg>Please try again!</ErrorMsg>
              <ErrorMsg>Or don't.</ErrorMsg>
              <ErrorMsg>In the grand scheme of the cosmos it really won't matter.</ErrorMsg>
              <ErrorMsg>Go live your life!</ErrorMsg>
              {/* eslint-enable react/no-unescaped-entities */}
            </ErrorMsgWrapper>
          )
          : sortedDecisionsArray.map((decision) => {
            return (
              <Decision key={decision.decisionId}>
                <Title>{decision.title}</Title>
                <DateAndName>{formatTimestamp(decision.timestamp)} by
                  <UserName> {decision.user.name}</UserName>
                </DateAndName>
              </Decision>
            );
          })
      }
    </Wrapper>
  );
}

const Header = styled.h1`
  color: #5f5f5f;
  font-family: sans-serif;
  font-size: 2.5rem;
  font-weight: 100;
  margin: 2rem auto;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ErrorMsgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ErrorMsg = styled.p`
  margin: 0 auto 0.5em;
  color: red;
  font-family: sans-serif;
`;

const DateAndName = styled.p`
  margin: 0;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const Decision = styled.div`
  color: #5f5f5f;
  border-left: 0.2em solid;
  border-left-color: red;
  margin-bottom: 2em;
  padding-left: 0.75em;
`;

const UserName = styled.span`
  font-weight: bold;
`;

export default Results;

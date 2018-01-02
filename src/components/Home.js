import React from 'react';
import styled from 'styled-components';
import { blueFont } from 'shared-styles';

function Home() {
  return (
    <Wrapper>
      <Header>Would You Rather?</Header>
      <SubHeader>The 100 Year Old American Classic</SubHeader>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  ${blueFont}
  font-size: 6rem;
  margin-bottom: 0;
`;

const SubHeader = styled.h3`
  ${blueFont}
  font-size: 3rem;
`;

export default Home;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import { HomeContainer } from 'containers';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

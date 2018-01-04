import React from 'react';
import { bool } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import { Navigation } from 'components';
import { HomeContainer, AuthenticateContainer, ResultsContainer, MainContainer } from 'containers';
import routeProtection from 'helpers/routeProtection';

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

App.propTypes = {
  isFetching: bool.isRequired,
  isAuthed: bool.isRequired
};

function App({ isFetching, isAuthed }) {
  // if (isFetching === true) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <MainContainer>
        <Navigation isAuthed={isAuthed} />
        <Switch>
          <Route exact path='/' component={routeProtection(HomeContainer)} />
          <Route exact path='/auth' component={routeProtection(AuthenticateContainer)} />
          <Route exact path='/results' component={routeProtection(ResultsContainer)} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </MainContainer>
    </BrowserRouter>
  );
}

function mapStateToProps({ users }) {
  const { isFetching, isAuthed } = users;
  return {
    isFetching,
    isAuthed
  };
}

export default connect(mapStateToProps)(App);

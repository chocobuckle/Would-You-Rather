import React, { Component } from 'react';
import {  } from 'prop-types';
import { Results } from 'components';
import { setAndHandleDecisionsListener } from 'ducks/decisions';

class ResultsContainer extends Component {
  static propTypes = {

  };

  componentDidMount() {
    setAndHandleDecisionsListener();
  }

  render() {
    return (
      <div>
        <Results />
      </div>
    );
  }
}

export default ResultsContainer;

import React, { Component } from 'react';
import { bool, shape, string, number, func } from 'prop-types';
import { Results } from 'components';
import * as decisionsActionCreators from 'ducks/decisions';
import { decisionsAreStale } from 'helpers/utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ResultsContainer extends Component {
  static propTypes = {
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number.isRequired,
    setAndHandleDecisionsListener: func.isRequired,
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

  componentDidMount() {
    if (decisionsAreStale(this.props.lastUpdated)) {
      this.props.setAndHandleDecisionsListener();
    }
  }

  render() {
    const { isFetching, error, decisions } = this.props;
    return (
      <div>
        <Results
          isFetching={isFetching}
          error={error}
          decisions={decisions}
        />
      </div>
    );
  }
}

function mapStateToProps({ decisions: decisionsState }) {
  const { isFetching, decisions, error, lastUpdated } = decisionsState;
  return {
    isFetching,
    decisions,
    error,
    lastUpdated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...decisionsActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

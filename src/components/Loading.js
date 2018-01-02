import React, { Component } from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

class Loading extends Component {
  static propTypes = {
    text: string,
    speed: number
  }

  static defaultProps = {
    text: 'Loading',
    speed: 300
  }

  state = {
    text: this.props.text
  }

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = `${text}...`;
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            text: `${prevState.text}.`
          };
        });
      }
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Text>
        {this.state.text}
      </Text>
    );
  }
}

const Text = styled.p`
  text-align: center;
  margin: 0;
`;

export default Loading;

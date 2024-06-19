import { Typography } from '@mui/material';
import React, { Component } from 'react';

const ONE_SECOND = 1000;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  timer = () => {
    const interval = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(interval);
        this.setState({
          timer: 30,
        });
      } else {
        this.setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }
    }, ONE_SECOND);
  };

  render() {
    const { timer } = this.state;
    return (
      <Typography color="white">{ timer }</Typography>
    );
  }
}
export default Timer;

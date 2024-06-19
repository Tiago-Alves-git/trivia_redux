import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TiHome } from 'react-icons/ti';
import { connect } from 'react-redux';
import { Box, Button } from '@mui/material';
import PlayersCards from '../Components/PlayersCards';
import { resetScore } from '../redux/actions/actions';
import Header from '../Components/Header';

class Rankings extends Component {
  handleHome = async () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    return (
      <Box sx={ { display: 'flex' } }>
        <Header />
        <Button onClick={ this.handleHome } data-testid="btn-go-home">
          <TiHome pointerEvents="none" />
        </Button>
        Rankings
        <PlayersCards />
      </Box>
    );
  }
}

Rankings.propTypes = {
  email: PropTypes.any,
  name: PropTypes.shape({
    charAt: PropTypes.func,
    slice: PropTypes.func,
  }),
  score: PropTypes.any,
}.isRequired;
export default connect()(Rankings);

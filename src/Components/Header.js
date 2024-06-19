import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Style/Header.css';
import Icon from '@mdi/react';
import { mdiCounter } from '@mdi/js';
import { TiHome } from 'react-icons/ti';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { resetScore } from '../redux/actions/actions';

class Header extends React.Component {
  handleHome = async () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { name, score } = this.props;
    return (
      <Box>
        <Box className="HeaderContent">
          <Button onClick={ this.handleHome } data-testid="btn-go-home">
            <TiHome pointerEvents="none" color="yellow" size={ 20 } />
          </Button>
          <Typography
            color="yellow"
            sx={ {
              display: 'flex', alignContent: 'center', gap: '10px' } }
          >
            <Icon path={ mdiCounter } size={ 1 } />
            Pontuação :
            {' '}
            { score }
          </Typography>
          <Typography color="yellow">
            {' '}
            { name.charAt(0).toUpperCase()
              + name.slice(1) }
            {' '}
          </Typography>
        </Box>
      </Box>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
Header.defaultProps = { email: '', name: '', score: '' };

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});
export default connect(mapStateToProps)(withRouter(Header));

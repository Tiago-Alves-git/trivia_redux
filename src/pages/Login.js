import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';
import SettingsButton from '../Components/SettingsButton';
import fetchTokenApi from '../Requisiçoẽs/RequestToken';
import { userAction } from '../redux/actions/actions';
import logo from '../trivia.png';
import RankingButton from '../Components/RankingButton';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    this.setState({
      [name]: value,
    }, () => this.isButtonDisabled());
  };

  handleClick = async () => {
    const { history } = this.props;
    const userToken = await fetchTokenApi();
    localStorage.setItem('token', userToken.token);
    const { dispatch } = this.props;
    dispatch(userAction(this.state));
    history.push('/game');
  };

  isButtonDisabled = () => {
    const { state } = this;
    const nameLength = 1;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailTest = regex.test(state.email);
    if (state.name.length >= nameLength && emailTest) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <Box className="App">
        <Box className="App-header">
          <Typography color="yellow">
            Ranking:
            {' '}
            <RankingButton className="rkngBtn" />
          </Typography>
          <img src={ logo } className="App-logo" alt="logo" />
          {/* <Typography className="login-title">SUA VEZ</Typography> */}
          <Box sx={ { display: 'flex' } }>
            <Box sx={ { display: 'flex', flexDirection: 'column' } }>
              <TextField
                InputLabelProps={ { style: { color: 'white' } } }
                label="Seu Nome"
                color="warning"
                onChange={ this.handleChange }
                name="name"
                data-testid="input-player-name"
                id="name-input"
                sx={ { m: 1,
                  width: '25ch',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  } } }
              />
              <TextField
                InputLabelProps={ { style: { color: 'white' } } }
                label="Seu Email"
                color="warning"
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                id="email-input"
                sx={ { m: 1,
                  width: '25ch',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  } } }
              />
            </Box>
            <Button
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ this.handleClick }
              endIcon={ (
                <Icon
                  path={ mdiPlay }
                  size={ 1 }
                  color={ disabled ? 'disabled' : 'yellow' }
                />) }
              sx={ { m: 1 } }
            >
              <Typography color={ disabled ? 'disabled' : 'yellow' }> JOGAR </Typography>
            </Button>
            <SettingsButton />
          </Box>
        </Box>
      </Box>
    );
  }
}

Login.defaultProps = {
  history: () => { },
  dispatch: () => {},
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
};

export default connect()(Login);

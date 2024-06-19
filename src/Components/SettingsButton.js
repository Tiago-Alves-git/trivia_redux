import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';

class SettingsButton extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <Button
        onClick={ this.handleClick }
        data-testid="btn-settings"
        color="secondary"
        endIcon={ (
          <Icon path={ mdiCog } size={ 1 } color="yellow" />
        ) }
        sx={ { m: 1 } }
      >
        <Typography color="yellow"> CONFIGURAÇÃO </Typography>
      </Button>
    );
  }
}

SettingsButton.defaultProps = {
  history: () => {},
};
SettingsButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default withRouter(SettingsButton);

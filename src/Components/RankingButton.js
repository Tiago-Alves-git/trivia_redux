import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import Icon from '@mdi/react';
import { mdiTrophy } from '@mdi/js';

class RankingButton extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/rankings');
  };

  render() {
    return (
      <Button
        onClick={ this.handleClick }
        data-testid="btn-ranking"
        className="RankingBtn"
        color="secondary"
      >
        <Icon
          path={ mdiTrophy }
          size={ 1 }
          color="yellow"
        />
      </Button>
    );
  }
}
RankingButton.defaultProps = {
  history: () => { },
};

RankingButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default connect()(withRouter(RankingButton));

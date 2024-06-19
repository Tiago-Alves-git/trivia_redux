import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { saveRankingPlayer, saveAssertions } from '../redux/actions/actions';
import Load from './Load';
// import Timer from './Timer';
import '../Style/QuestionCard.css';

const THIRTY_SECONDS = 30000;
const FIVE = 5;

class NewCards extends Component {
  state = ({
    loading: true,
    Page: 0,
    disabled: false,
    assertions: 0,
    showButton: false,
  });

  componentDidMount() {
    const { Results } = this.props;
    const { Questions } = Results;
    this.setState((prevState) => ({
      ...prevState,
      loading: false,
      Answers: Questions,
    }));
    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        disabled: true,
      }));
    }, THIRTY_SECONDS);
  }

  // handleAnswers = (event) => {};

  handleAnswers = (index) => {
    const { Answers, assertions, Page } = this.state;
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      showButton: true,
    }));
    console.log(Answers[Page].PerguntaCorreta);
    console.log(index);
    if (Answers[Page].PerguntaCorreta === index) {
      const result = assertions + 1;
      this.setState((prevState) => ({
        ...prevState,
        assertions: result,
      }));
      dispatch(saveAssertions(assertions));
    } else {
      dispatch(saveAssertions(assertions));
    }
  };

  handleClick = () => {
    const { Page } = this.state;
    const { history, dispatch } = this.props;
    if (Page === FIVE) {
      dispatch(saveRankingPlayer());
      history.push('/rankings');
    } else {
      this.setState((prevState) => ({
        ...prevState,
        showButton: false,
        Page: prevState.Page + 1,
      }), () => this.componentDidMount());
    }
  };

  render() {
    const { loading, Page, showButton, Answers } = this.state;
    // const { Results } = this.props;
    console.log('Answers', Answers);
    console.log('Page', Page);
    return (
      <Box sx={ { display: 'flex', flexDirection: 'column' } }>
        { loading ? <Load /> : (
          <Box
            sx={ {
              marginTop: '50px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center' } }
          >
            {/* <Timer /> */}
            <Box>
              <Typography color="white" sx={ { fontSize: '30px' } }>
                { Answers[Page].Pergunta }
              </Typography>
            </Box>
            <Box
              sx={ { margin: '20px auto',
                width: '600px',
                height: '600px',
                display: 'grid',
                gridTemplateColumns: '300px 300px',
                rowGap: '20px',
                columnGap: '20px',
              } }
            >
              {Answers[Page].Opções.map((options, index) => (

                <Box
                  className={ Answers[Page].PerguntaCorreta === index
                    ? `${showButton}Correct`
                    : `${showButton}Incorrect` }
                  key={ index }
                  sx={ { display: 'flex',
                    borderRadius: '10%',
                    boxShadow: '0px 0px 10px 0px rgba(255, 255, 0, 0.7)',
                  } }
                >
                  <Button onClick={ () => this.handleAnswers(index) }>
                    <Typography
                      color="white"
                      sx={ { fontFamily: 'sans-serif',
                        fontSize: '20px',
                        padding: '10px' } }
                    >
                      {options}
                    </Typography>
                  </Button>
                </Box>))}
            </Box>
          </Box>
        ) }
        { showButton
          && (
            <Button
              data-testid="btn-next"
              onClick={ this.handleClick }
            >
              <Typography color="white">
                Proxima Pergunta
              </Typography>
            </Button>
          )}
      </Box>
    );
  }
}

NewCards.propTypes = {
  results: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  Results: state.gamer.questions,
});

export default connect(mapStateToProps)(withRouter(NewCards));

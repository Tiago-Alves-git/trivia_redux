import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Load from '../Components/Load';
// import QuestionCards from '../Components/QuestionCards';
import './Game.css';
import setResults from '../redux/actions/actions';
import NewQuestions from '../Resources/Questions.json';
import NewCards from '../Components/newCards';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      canUptade: false,
    };
  }

  async componentDidMount() {
    const { history, dispatch, Questions } = this.props;
    // const fail = 3;
    // const token = localStorage.getItem('token');
    if (!NewQuestions) {
      localStorage.clear();
      history.push('/');
    } else {
      const Results = NewQuestions;
      this.setState({
        canUptade: true,
      });
      if (Questions.length === 0) {
        dispatch(setResults(Results));
      }
    }
  }

  render() {
    const { canUptade } = this.state;
    return (
      <div>
        { !canUptade ? <Load /> : (
          <>
            <Header />
            {/* <QuestionCards /> */}
            <NewCards />
          </>
        ) }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  Questions: state.gamer.questions,
});

export default connect(mapStateToProps)(Game);

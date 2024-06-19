import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './Style/App.css';
import Settings from './pages/Settings';
import store from './redux';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/rankings" component={ Ranking } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

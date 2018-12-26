import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { QuestionPage } from './components/pages/questionPage/questionPage';
import { AnswerPage } from './components/pages/answerPages/answerPage'


export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/questions-page' />
          <Route exact path="/questions-page" component={QuestionPage} />
          <Route path="/answer-page" component={AnswerPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}


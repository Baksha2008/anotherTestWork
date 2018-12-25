import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestion } from '../../../store/action/getQuestion'
import axios from 'axios'
import { ResetButton } from '../../buttons/resetButtons/resetButtons';
import { SendButton } from '../../buttons/sendAnswerButtons/sendAnswerButtons';
import { getRadioValue } from '../../../store/action/getRadioValue'
import { getSecondQuestionCheckboxValue } from '../../../store/action/getSecondQuestionCheckboxValue'
import { getThirdQuestionCheckboxValue } from "../../../store/action/getThirdQuestionCheckboxValue"
import { getSelectValueAction } from '../../../store/action/getSelectValueAction'
import { getInputValueAction } from '../../../store/action/getInputValueAction'
import { modalWindowActiveAction } from '../../../store/action/modalWindowActiveAction'
import { ModalWindow } from './modal/modalWindow'
import './questionPage.css'

class QuestionPageComponent extends Component {
  getRadioValue = e => {
    this.props.getRadioValue(e.target.value)
  }
  getSecondQuestionCheckboxValue = e => {
    this.props.getSecondQuestionCheckboxValue(e.target.value)
  }
  getThirdQuestionCheckboxValue = e => {
    this.props.getThirdQuestionCheckboxValue(e.target.value)
  }
  getSelectValueAction = e => {
    this.props.getSelectValueAction(e.target.value)
  }
  getInputValueAction = e => {
    this.props.getInputValueAction(e.target.value)
  }
  getQuestion = () => {
    const url = '/question.json'
    const { getQuestion } = this.props
    axios.get(url).then(resp => {
      getQuestion(resp.data)
    })
      .catch(err => {
        console.error(err)
      })
  }
  componentWillMount() {
    let local = JSON.parse(localStorage.getItem('question'))
    if (local !== null) {
      this.props.getQuestion(local)
    }
  }
  componentDidMount() {
    let questionsFromLocalStorage = JSON.parse(localStorage.getItem('question'))
    if (questionsFromLocalStorage === null) {
      this.getQuestion()
    }
  }
  componentWillUpdate(nextProps) {
    localStorage.setItem('question', JSON.stringify(nextProps.reducer.questions))
  }
  sendAnswer = () => {
    const { history } = this.props
    const { questions } = this.props.reducer
    let noAnswer = questions.some(elem => {
      return elem.answer === ''
    })
    if (noAnswer) {
      this.props.modalWindowActiveAction()
    }
    else {
      history.push('/answer-page')
    }
  }
  listQuestion = () => {
    const { questions } = this.props.reducer
    const listQuestion = questions.map((elem, i) => {
      if (elem.type === 'radio') {
        let arr = elem.answerOptions.map((answer, i) => {
          return <label key={i}>
            <input
              type={elem.type}
              value={answer}
              name={elem.id.toString()}
              onChange={this.getRadioValue}
              checked={elem.answer.includes(answer)}
            />
            {answer}
          </label>
        })
        return <div key={i}>
          <h2 className='headline'>{elem.question}</h2>
          <form className='checkboxAndRadio'>
            {arr}
          </form>
        </div>
      }
      if (elem.type === 'checkbox' && elem.id === 1) {
        return <div key={i}>
          <h2 className='headline'>{elem.question}</h2>
          <form className='checkboxAndRadio'>
            {elem.answerOptions.map((answer, i) => {
              return <label key={i}>
                <input
                  type={elem.type}
                  name={elem.id.toString()}
                  value={answer}
                  onChange={this.getSecondQuestionCheckboxValue}
                  checked={elem.answer.includes(answer)}
                />
                {answer}
              </label>
            })}
          </form>
        </div>
      }
      if (elem.type === 'checkbox' && elem.id === 2) {
        return <div key={i}>
          <h2 className='headline'>{elem.question}</h2>
          <form className='checkboxAndRadio'>
            {elem.answerOptions.map((answer, i) => {
              return <label key={i}>
                <input
                  onChange={this.getThirdQuestionCheckboxValue}
                  type={elem.type}
                  name={elem.id.toString()}
                  value={answer}
                  checked={elem.answer.includes(answer)}
                />
                {answer}
              </label>
            })}
          </form>
        </div>
      }
      if (elem.type === 'select') {
        return <div className='selectbox' key={i}>
          <h2 className='headline'>{elem.question}</h2>
          <select
            onChange={this.getSelectValueAction}
            className='select'           
          >
            <option hidden>Select answer</option>
            {elem.answerOptions.map((answer, i) => {
              return <option
                key={i}
                value={answer}
                selected={elem.answer.includes(answer)}
              >
                {answer}
              </option>
            })}
          </select>
        </div>
      }
      if (elem.type === 'text') {
        return <div className='inputbox' key={i}>
          <h2 className='headline'>{elem.question}</h2>
          <input className='input' type={elem.type} placeholder='Ваш ответ' value={elem.answer} onChange={this.getInputValueAction} />
        </div>
      }
      return null
    })
    return listQuestion
  }
  render() {
    const { modalWindowActive } = this.props.reducer
    return (
      <div className='wrapper'>
        <h1>Проверь, на сколько хорошо ты знаешь JavaScript</h1>
        {this.listQuestion()}
        <div>
          <ResetButton />
          <SendButton sendAnswer={this.sendAnswer} />
        </div>
        {
          modalWindowActive ? <ModalWindow /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
  getQuestion,
  getRadioValue,
  getSecondQuestionCheckboxValue,
  getThirdQuestionCheckboxValue,
  getSelectValueAction,
  getInputValueAction,
  modalWindowActiveAction
}

export const QuestionPage = connect(mapStateToProps, mapDispatchToProps)(QuestionPageComponent)
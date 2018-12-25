import React, { Component } from 'react'
import { connect } from 'react-redux'
import { correctAnswerCounterAction } from '../../../store/action/correctAnswerCounterAction'
import { RetakeTestButton } from '../../buttons/retakeTestButton/retakeTestButton'
import './answerPage.css'

class AnswerPageComponent extends Component {
    constructor(){
        super()
        this.counter = 0
    }
    listQuestion = () => {
        let style;
        let localQuestion = JSON.parse(localStorage.getItem('question'))
        const listQuestion = localQuestion.map((elem, i) => {
            if (elem.id === 0) {
                if(elem.answer !== elem.correctAnswer || elem.answer === '' ){
                    style = 'error'
                }
                else{
                    style = 'headline'
                    this.counter = this.counter + 1
                }
                return <div key={i}>
                    <h2 className={style}>{elem.question}</h2>
                    <p>Ваш ответ: {elem.answer}</p>
                    <p>Правильный ответ: {elem.correctAnswer } </p>
                </div>
            }
            if (elem.id === 1) {
                if(JSON.stringify(elem.answer) === JSON.stringify(elem.correctAnswer)){
                    style = 'headline'
                    this.counter = this.counter + 1
                }
                else{
                    style = 'error'
                }
                return <div key={i}>
                    <h2 className={style}>{elem.question}</h2>
                    <p>Ваш ответ: {elem.answer}</p>
                    <p>Правильный ответ: {elem.correctAnswer}</p>
                </div>
            }
            if (elem.id === 2) {
                if(JSON.stringify(elem.answer.sort()) === JSON.stringify(elem.correctAnswer.sort())){
                    style = 'headline'
                    this.counter = this.counter + 1
                }
                else{
                    style = 'error'
                }
                return <div key={i}>
                    <h2 className={style}>{elem.question}</h2>
                    <p>Ваш ответ: {elem.answer}</p>
                    <p>Правильный ответ: {elem.correctAnswer}</p>
                </div>
            }
            if (elem.id === 3) {
                if(elem.answer !== elem.correctAnswer || elem.answer === '' ){
                    style = 'error'
                }
                else{
                    style = 'headline'
                    this.counter = this.counter + 1
                }
                return <div className='selectbox' key={i}>
                    <h2 className={style}>{elem.question}</h2>
                    <p>Ваш ответ: {elem.answer}</p>
                    <p>Правильный ответ: {elem.correctAnswer}</p>
                </div>
            }
            if (elem.id === 4) {
                if(elem.answer !== elem.correctAnswer || elem.answer === '' ){
                    style = 'error'
                }
                else{
                    style = 'headline'
                    this.counter = this.counter + 1
                }
                return <div className='inputbox' key={i}>
                    <h2 className={style}>{elem.question}</h2>
                    <p>Ваш ответ: {elem.answer}</p>
                    <p>Правильный ответ: {elem.correctAnswer}</p>
                </div>
            }
            return null
        })
        return listQuestion
    }
    retakeTest = () => {
        const { history } = this.props
        history.push('/questions-page')
    }
    scoreCalculate = () => {
        let localQuestion = JSON.parse(localStorage.getItem('question'))
        let score = (this.counter * 100) / localQuestion.length;
        if (score <= 20) {
            return 1
        } else if (score > 20 && score <= 40) {
            return 2
        } else if (score > 40 && score <= 60) {
            return 3
        } else if (score > 60 && score <= 80) {
            return 4
        } else if (score > 80 && score <= 100) {
            return 5
        }
        return false
    };
    render() {
        let localQuestion = JSON.parse(localStorage.getItem('question'))
        return (
            <div className='wrapper'>
                <h1>Ну что, посмотрим результат?</h1>
                {this.listQuestion()}
                <div>
                    <p>Правильных ответов {this.counter} из {localQuestion.length}</p>
                    <p>Ваша оценка: {this.scoreCalculate()}</p>
                    <RetakeTestButton
                        retakeTest={this.retakeTest}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    correctAnswerCounterAction
}

export const AnswerPage = connect(mapStateToProps, mapDispatchToProps)(AnswerPageComponent)

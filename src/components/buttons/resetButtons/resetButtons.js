import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearAnswersAction } from '../../../store/action/clearAnswersActions'
import './resetButton.css'

class ResetButtonComponent extends Component {
    clearAnswers = () =>{
        this.props.clearAnswersAction()
    }
    render() {
        return <button className='button' onClick={this.clearAnswers}>Сбросить</button>
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    clearAnswersAction
}

export const ResetButton = connect(mapStateToProps, mapDispatchToProps)(ResetButtonComponent)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearAnswersAction } from '../../../store/action/clearAnswersActions'
import { modalWindowCancelAction } from '../../../store/action/modalWindowCancelAction'
import './retakeButton.css'

class RetakeTestButtonComponent extends Component {
    reatakeTest = () =>{
        this.props.retakeTest()
        this.props.modalWindowCancelAction()
        localStorage.removeItem('question')
    }
    render() {
        return <button className='button' onClick={this.reatakeTest}>Пройти тест заново</button>
    }
}
const mapStateToProps = state => state

const mapDispatchToProps = {
    clearAnswersAction,
    modalWindowCancelAction
}

export const RetakeTestButton = connect(mapStateToProps, mapDispatchToProps)(RetakeTestButtonComponent)
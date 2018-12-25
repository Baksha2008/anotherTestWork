import React, { Component } from 'react'
import { connect } from 'react-redux'
import './sendButton.css'


class SendButtonComponent extends Component {
    
    render() {
        const { sendAnswer} = this.props
        return <button className='button' onClick={sendAnswer}>Ответить</button>
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    // clearAnswersAction
}

export const SendButton = connect(mapStateToProps, mapDispatchToProps)(SendButtonComponent)

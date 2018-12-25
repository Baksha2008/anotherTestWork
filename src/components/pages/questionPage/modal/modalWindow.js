import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './modalWindow.css'
import { connect } from 'react-redux'
import { modalWindowCancelAction } from '../../../../store/action/modalWindowCancelAction'


class ModalWindowComponent extends Component {
    cancelModal = () =>{
        this.props.modalWindowCancelAction()
    }
    render() {
        return (
            <div className="modalbackground">
                <div className='modalWindow'>
                    <p>Каждый не отвеченный ответ считается неправильным, Вы уверены что хотите продолжить?</p>
                    <div>
                        <Link to='/answer-page'><button className='button'>Да</button></Link>
                        <button className='button' onClick={this.cancelModal}>Нет</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
  modalWindowCancelAction
}

export const ModalWindow = connect(mapStateToProps, mapDispatchToProps)(ModalWindowComponent)

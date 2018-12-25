const initialState = {
    questions: [],
    modalWindowActive: false,
    correctAnswerCounter: 0
}

export const reducer = (state = initialState, action) => {
    if (action.type === 'QUESTION') {
        return {
            ...state,
            questions: action.payload
        }
    }
    if (action.type === 'RADIO') {
        state.questions.map(elem => {
            if (elem.id === 0) {
                elem.answer = action.payload
            }
            return null
        })
        return {
            ...state
        }
    }
    if (action.type === 'SECOND_CHECKBOX') {
        state.questions.map(elem => {
            if (elem.id === 1) {
                let answerIndex = elem.answer.indexOf(action.payload)
                if (answerIndex !== -1) {
                    elem.answer.splice(answerIndex, 1)
                }
                else (
                    elem.answer.push(action.payload)
                )
            }
            return null
        })
        return {
            ...state
        }
    }
    if (action.type === 'THIRD_CHECKBOX') {
        state.questions.map(elem => {
            if (elem.id === 2) {
                let answerIndex = elem.answer.indexOf(action.payload)
                if (answerIndex !== -1) {
                    elem.answer.splice(answerIndex, 1)
                }
                else (
                    elem.answer.push(action.payload)
                )
            }
            return null
        })
        return {
            ...state,
        }
    }
    if (action.type === 'SELECT') {
        state.questions.map(elem => {
            if (elem.id === 3) {
                elem.answer = action.payload
            }
            return null
        })
        return {
            ...state
        }
    }
    if (action.type === 'INPUT') {
        state.questions.map(elem => {
            if (elem.id === 4) {
                elem.answer = action.payload
            }
            return null
        })
        return {
            ...state
        }
    }
    if (action.type === 'CLEAR') {
        state.questions.map(elem => {
            if(elem.type === 'checkbox'){
                elem.answer = []
            }
            else{
                elem.answer = ''
            }
            return null
        })
        return {
            ...state
        }
    }
    if(action.type === 'MODAL_ACTIVE'){
        return {
            ...state,
            modalWindowActive: true
        }
    }
    if(action.type === 'MODAL_CANCEL'){
        return {
            ...state,
            modalWindowActive: false
        }
    }
    if(action.type === 'ANSWER_COUNTER'){
        
        return {
            ...state,
            correctAnswerCounter: state.correctAnswerCounter + 1
        }
    }
    return state
}
let timeoutID = ''

const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const notificationChange = (notification, duration) => {
    return async (dispatch) => {
        if(timeoutID){
            clearTimeout(timeoutID)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: notification
        })
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, duration * 1000)
    }
}

export default notificationReducer
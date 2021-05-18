const userReducer = (state = null, action) => {
    if (action.type === 'SET_USER') {
        return action.user
    } else {
        return state
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export default userReducer
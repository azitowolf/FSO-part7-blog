const AuthReducer = (state = null, action) => {
    if (action.type === 'SET_USER') {
        return action.user
    } else {
        return state
    }
}

export default AuthReducer
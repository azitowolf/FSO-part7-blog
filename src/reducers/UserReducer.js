const UserReducer = (state = null, action) => {
    if (action.type === 'POPULATE_USERS') {
        return action.value
    } else {
        return state
    }
}

export default UserReducer
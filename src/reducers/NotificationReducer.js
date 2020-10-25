const NotificationReducer = (state = null, action) => {
    if (action.type === 'NOTIFY') {
        return action.message
    } else {
        return state
    }
}

export default NotificationReducer
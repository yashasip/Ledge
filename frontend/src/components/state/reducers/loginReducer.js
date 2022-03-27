const reducer = (state = false, action) => {
    if (action.type === 'isAuthenticated') {
        return action.payload
    }
    else {
        return state
    }
}

export default reducer;
export const login = (authentication) => {
    console.log('check2')
    console.log(authentication)
    return (dispatch) => {
        dispatch({
            type: 'isAuthenticated',
            payload: authentication,
        })
    }
}

// export const loginCheck = (authentication) => {
//     return (dispatch) => {
//         dispatch({
//             type: 'notAuthenticated',
//             payload: authentication,
//         })
//     }
// }
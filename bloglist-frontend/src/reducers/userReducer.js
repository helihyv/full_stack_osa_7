import loginService from "./../services/login"
const initialState = null

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        default:
          return state
        case 'LOGIN':
          return action.user
        case 'LOGOUT':
        return  null  
    }
}

export const initializeUser = () => {

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

//      blogService.setToken(user.token)

        return (dispatch) => {
            dispatch({
                type: 'LOGIN',
                user

            })
        }

    }

    return (dispatch) => {
        dispatch({
            type: 'DO_NOTHING'            
        })
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const login = (username, password) => {

    return async  (dispatch) => {

        try {
            const user = await loginService.login({
            username,
            password
         })  

//        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

        console.log("succesfull login")

        dispatch ({
            type: "LOGIN",
            user 
        })
    
        } catch(exception) {  
           console.log("Failed to login")   
           dispatch({
               type: 'DO_NOTHING'
           }) 
        }

    }
}

export default userReducer
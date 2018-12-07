import loginService from "../services/login"
import blogService from "../services/blogs"
const initialState = null

const loginReducer = (state = initialState, action) => {

  switch (action.type) {
  default:
    return state
  case "LOGIN":
    return action.user
  case "LOGOUT":
    return  null
  }
}

export const initializeLoggedUser = () => {

  const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)

    blogService.setToken(user.token)

    return (dispatch) => {
      dispatch({
        type: "LOGIN",
        user

      })
    }

  }

  return (dispatch) => {
    dispatch({
      type: "DO_NOTHING"
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem("loggedBloglistUser")
  blogService.setToken("")
  return (dispatch) => {
    dispatch({
      type: "LOGOUT"
    })
  }
}

export const login = (username, password) => {

  return async  (dispatch) => {


    const user = await loginService.login({
      username,
      password
    })

    blogService.setToken(user.token)
    window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))

    dispatch ({
      type: "LOGIN",
      user
    })

  }
}

export default loginReducer
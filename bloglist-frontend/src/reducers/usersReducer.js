import userService from "./../services/users"

const initialState = []

const usersReducer = (store = initialState, action) => {
  switch (action.type) {
  default:
    return store
  case "INIT_USERS":
    return action.users
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch({
      type: "INIT_USERS",
      users
    })
  }
}

export default usersReducer
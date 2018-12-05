const initialState = {
  text: "",
  isError: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return {
      text: action.text,
      isError: action.isError
    }
  case "CLEAR_NOTIFICATION":
    return {
      text: "",
      isError: false
    }
  default: {
    return state
  }

  }

}

export const notify = (text, isError, seconds) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })
    },seconds*1000)

    dispatch({
      type: "SET_NOTIFICATION",
      text,
      isError
    })
  }
}

export default notificationReducer
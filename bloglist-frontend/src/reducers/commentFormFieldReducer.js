const initialState = ""

const commentFormFieldReducer = (store = initialState, action) => {

  switch (action.type) {
  default:
    return store
  case "SET_COMMENT_FIELD":
    return action.comment
  }

}

export const setCommentField = (comment) => async (dispatch) => {

  dispatch({
    type: "SET_COMMENT_FIELD",
    comment
  })
}

export default commentFormFieldReducer
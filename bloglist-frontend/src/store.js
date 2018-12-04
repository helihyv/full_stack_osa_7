import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from "./reducers/loginReducer"
import blogReducer from "./reducers/blogReducer"
import usersReducer from "./reducers/usersReducer"

const reducer = combineReducers({
  notification: notificationReducer,
  user: loginReducer,
  blogs: blogReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
import React from "react"
import { connect } from "react-redux"
import { deleteBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"
import PropTypes from "prop-types"
import { Button } from "semantic-ui-react"

const DeleteButton = (props) => {

  if (props.blog.user && props.currentUser && props.blog.user.username !== props.currentUser.username) {
    return null
  } else {
    return (<Button type="button" onClick={handleClick(props.blog, props.deleteBlog, props.notify)} >delete</Button>)
  }
}

DeleteButton.propTypes = {
  blog: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string
    })
  }).isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string
  }).isRequired
}


const handleClick =  (blog, deleteFunction, notifyFunction)  => async () => {


  if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {

    try {
      await deleteFunction(blog._id)
      notifyFunction(`the blog '${blog.title}' by ${blog.author} deleted`, false, 5)
    } catch (exception) {

      notifyFunction(`deleting the blog '${blog.title}' by ${blog.author} failed: ${exception}`, true, 5)
    }
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

export default connect(
  mapStateToProps,
  { deleteBlog, notify }
)(DeleteButton)
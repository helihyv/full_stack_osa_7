import React from 'react'
import { connect } from 'react-redux';
import { deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const DeleteButton = (props) => {

    if (props.blog.user && props.currentUser && props.blog.user.username !== props.currentUser.username) {
      return null
    } else {
      return (<button type="button" onClick={handleClick(props.blog, props.deleteBlog, props.notify)} >delete</button>)
    }
  }
  
  DeleteButton.propTypes = {
    blog: PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string
      })
    }).isRequired,
    user: PropTypes.shape({
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
    {deleteBlog, notify}
)(DeleteButton)
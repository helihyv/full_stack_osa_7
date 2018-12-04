import React from 'react'
import { connect } from 'react-redux'
import { addLike } from './../reducers/blogReducer'
import PropTypes from 'prop-types'

const handleAddLike = (blog) => () => addLike(blog)

const DeleteButton = ({onClick,blog,user}) => {

    if (blog.user && user && blog.user.username !== user.username) {
      return null
    } else {
      return (<button type="button" onClick={onClick} >delete</button>)
    }
  }
  
  DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    blog: PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string
      })
    }).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string
    }).isRequired
  }
  

  const handleDelete = () => {


    if (window.confirm(`Delete '${this.state.blog.title}' by ${this.state.blog.author}?`)) {
    
      this.props.deleteBlog(this.state.blog._id)
//          this.props.notify(`the blog '${blog.title}' by ${blog.author} deleted`, false, 5)

//      this.props.notify(`deleting the blog '${blog.title}' by ${blog.author} failed: ${exception}`, true, 5)
}
}

const BlogView = (props) => {

    console.log("blogview reached", props.blogId, props.blogs)
    const blog = props.blogs.find((blog) => blog._id === props.blogId)

    if (blog === undefined) {
        console.log("blog undefined")
        return null
    }

    const addedByText = blog.user ? "added by ".concat(blog.user.username) : ""

    return (
        <div>
            <h2>The {blog.title} {blog.author} </h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button type="button" onClick={handleAddLike(blog)}>like</button><br/>
            {addedByText} <br/>
            <DeleteButton onClick={handleDelete} blog={blog} user={props.currentUser}/>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        currentUser: state.user.username
    }
} 

export default connect (mapStateToProps)(BlogView)
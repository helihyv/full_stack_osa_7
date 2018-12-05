import React from 'react'
import { connect } from 'react-redux'
import { addLike } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import DeleteButton from './DeleteButton'

const handleAddLike = (blog, addLikeFunction, notifyFunction) => async ()  => {
  try {
    await addLikeFunction(blog)
    notifyFunction(`liked the blog ${blog.title}`, false, 5)
  } catch (exception) {
    notifyFunction(`failed to add a like to the blog ${blog.title}: ${exception}`, true, 5)
  }
}
const BlogView = (props) => {

    const blog = props.blogs.find((blog) => blog._id === props.blogId)

    if (blog === undefined) {
        return null
    }

    const adder = blog.user ? blog.user.username : "anonymous"
    return (
        <div>
            <h2>The {blog.title} {blog.author} </h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button type="button" onClick={handleAddLike(blog, props.addLike, props.notify)}>like</button><br/>
            added by {adder} <br/>
            <DeleteButton blog={blog} />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
} 

export default connect (
  mapStateToProps,
  {addLike, notify}
  )(BlogView)
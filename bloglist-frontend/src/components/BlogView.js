import React from 'react'
import { connect } from 'react-redux'
import { addLike } from './../reducers/blogReducer'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'

const handleAddLike = (blog) => () => addLike(blog)

const BlogView = (props) => {

    const blog = props.blogs.find((blog) => blog._id === props.blogId)

    if (blog === undefined) {
        return null
    }

    const addedByText = blog.user ? "added by ".concat(blog.user.username) : ""

    return (
        <div>
            <h2>The {blog.title} {blog.author} </h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button type="button" onClick={handleAddLike(blog)}>like</button><br/>
            {addedByText} <br/>
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
  {addLike}
  )(BlogView)
import React from 'react'
import { connect } from 'react-redux'
import { addLike } from './../reducers/blogReducer'

const handleAddLike = (blog) => () =>  { 

    addLike(blog)
}

const BlogView = (props) => {

    console.log("blogview reached", props.blogId, props.blogs)
    const blog = props.blogs.find((blog) => blog._id === props.blogId)

    if (blog === undefined) {
        console.log("blog undefined")
        return null
    }

    return (
        <div>
            <h2>The {blog.title} {blog.author} </h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <br/>
            added by {blog.user.username} <button type="button" onClick={handleAddLike(blog)}>like</button><br/>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
} 

export default connect (mapStateToProps)(BlogView)
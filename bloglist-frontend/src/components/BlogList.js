import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux';

const BlogList = (props) => {
    return (
<div>
    <h2>blogs</h2>
    {props.blogs
    .map(blog => 
      <Blog key={blog._id} blog={blog}/>
  )}
</div>
    )

    }


    const mapStateToProps = (state) => {
        return {
        blogs: state.blogs
        }
    }

export default connect(mapStateToProps)(BlogList)


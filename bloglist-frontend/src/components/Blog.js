import React from 'react'
import PropTypes from 'prop-types'
  
const Blog = ({ blog }) => {
  
        const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
         
      return (
        <div style={blogStyle} >
          <div className="nameAndAuthor">
           <a href= {`/blogs/${blog._id}`}><div>{blog.title}: {blog.author}</div></a>
          </div>
        </div>
      )

  }
  
  Blog.propTypes = {
    blog: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    }).isRequired
  }

  const mapStateToProps = (state) => {
    return {
      currentUser: state.user
    }
  }

  export default Blog
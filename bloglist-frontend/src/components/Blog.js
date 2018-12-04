import React from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, addLike } from '../reducers/blogReducer'
import { connect } from 'react-redux'


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
  
class Blog extends React.Component {
    constructor(props) {
      super(props)

      this.state =
      {
        blog: props.blog,
        showFullInfo: false,
      }
    }
  
    toggleFullInfo = () => {
      this.setState({
        showFullInfo: !this.state.showFullInfo
      })
    }
  
    handleAddLike = async () => {
      this.props.addLike(this.state.blog)
    }
  
    handleDelete = () => {


        if (window.confirm(`Delete '${this.state.blog.title}' by ${this.state.blog.author}?`)) {
        
          this.props.deleteBlog(this.state.blog._id)
//          this.props.notify(`the blog '${blog.title}' by ${blog.author} deleted`, false, 5)

  //      this.props.notify(`deleting the blog '${blog.title}' by ${blog.author} failed: ${exception}`, true, 5)
    }
  }

  
    render() {
      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
  
      const showWhenFullInfo= {
        display: this.state.showFullInfo ? '' :'none',
        paddingTop: 5,
        paddingLeft: 15 
      }
  
          const userInfo= this.state.blog.user ? this.state.blog.user.name : ""
          
      return (
        <div style={blogStyle} >
          <div onClick={this.toggleFullInfo} className="nameAndAuthor">
           {this.state.blog.title}: {this.state.blog.author}
          </div>
          <div style={showWhenFullInfo} className="details">
            <a href={this.state.blog.url} >{this.state.blog.url}</a><br/>
            {this.state.blog.likes} likes <button type="button" onClick={this.handleAddLike}>like</button><br/>
            added by {userInfo}<br/>
            <DeleteButton onClick={this.handleDelete} blog={this.state.blog} user={this.state.currentUser}/>
  
          </div>  
        </div>
      )
  
    }
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
    }).isRequired,
    deleteFunction:PropTypes.func.isRequired, 
    currentUser: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  }

  const mapStateToProps = (state) => {
    return {
      currentUser: state.user
    }
  }

  export default connect (mapStateToProps, {deleteBlog, addLike})(Blog)
import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import { connect } from 'react-redux';
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import { initializeUser } from './reducers/userReducer';
import { initializeBlogs, create} from './reducers/blogReducer'
import BlogForm from './components/BlogForm'





class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenvisible = { display: this.state.visible ? 'none': '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenvisible}>
          <button onClick= {this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      notification: null,
      notificationIsError: false
    }
  }

  componentDidMount() {

    this.props.initializeBlogs()
    this.props.initializeUser()
    
  }


    

  render() {

  

    if (this.props.user === null) {
      return (
        <div>
        <Notification />
        <LoginForm />
        </div>
      )
    }

    return (
      <div>
 
        <h2>blogs</h2>
        <Notification />
        <LoginInfo />        

        <Togglable buttonLabel='new blog' >
          <BlogForm
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </Togglable>

        {this.props.blogs
          .map(blog => 
            <Blog key={blog._id} blog={blog} deleteFunction={this.deleteBlog} sortBlogsFunction={this.sortBlogs} currentUser={this.state.user}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps, {notify, initializeUser, initializeBlogs}
  )(App)

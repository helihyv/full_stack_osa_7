import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import { connect } from 'react-redux';
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'





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

const BlogForm = ({onSubmit, handleChange, title, author, url}) => {
  return (
  <div> 
    <h3>create new</h3>
    <form onSubmit={onSubmit} >
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div> 

  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
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
    blogService.getAll().then((blogs) => {
      blogs.sort((blog_a,blog_b) => blog_b.likes - blog_a.likes)
      this.setState({ blogs })

    })
  
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      this.setState({user})
      blogService.setToken(user.token)

    }


  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user
      })
      this.props.notify(`user ${user.username} logged in`, false, 5)
    } catch(exception) {    
        this.props.notify(`wrong username or password`, true, 5)
    }
  }

    logout = (event) => {
      
      const username = this.state.user.username
      this.setState({
        user: null,
      })

      window.localStorage.removeItem('loggedBloglistUser')
      
      this.props.notify(`user ${username} logged out`, false, 5)
    }

    createBlog = async (event) => {
      event.preventDefault()
       
      try{
        const newBlog =  await blogService.create({
          title: this.state.title,
          author: this.state.author,
          url: this.state.url
        })

        const blogList = this.state.blogs.concat(newBlog)
           
        this.setState({
          title:'',
          author: '',
          url: '',
          blogs: blogList
        })
        this.props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, false, 5) 
        
      } catch(exception) {
          this.props.notify(`adding a new blog failed: ${exception}`, true,5)
      }
      
     
    }

    deleteBlog = async(blog) => {
      try {

        if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
        
          await blogService.remove(blog._id)
   
          const blogs = this.state.blogs
          blogs.splice(blogs.indexOf(blog),1)
          this.setState( {
            blogs: blogs
          })
          this.props.notify(`the blog '${blog.title}' by ${blog.author} deleted`, false, 5)
        }
  
      } catch (exception) {
        this.props.notify(`deleting the blog '${blog.title}' by ${blog.author} failed: ${exception}`, true, 5)
      }
    }


    sortBlogs = () => {
      const blogs=this.state.blogs 
      blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})

      this.setState({
        blogs
      })
    }

    

  render() {

  

    if (this.state.user === null) {
      return (
        <div>
        <Notification />
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username
              <input
                name='username'
                type='text'
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit" >login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
 
        <h2>blogs</h2>
        <Notification />
        <p> {this.state.user.username} logged in <button type="button" onClick={this.logout} >logout</button></p>

        <Togglable buttonLabel='new blog' >
          <BlogForm
            onSubmit={this.createBlog}
            handleChange={this.handleFieldChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </Togglable>

        {this.state.blogs
          .map(blog => 
            <Blog key={blog._id} blog={blog} deleteFunction={this.deleteBlog} sortBlogsFunction={this.sortBlogs} currentUser={this.state.user}/>
        )}
      </div>
    );
  }
}

export default connect(
  null, {notify}
  )(App)

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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps, {notify}
  )(App)

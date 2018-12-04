import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'

class BlogForm extends React.Component  { 
    
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            author:"",
            url:""
        }
    }
    
    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
        }
      
      
    handleCreateBlog = async (event) => {
          event.preventDefault()

          console.log(createBlog)
        
      
          this.props.createBlog(this.state.title, this.state.author, this.state.url)
           
      //            this.props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, false, 5) 
            
      
      //              this.props.notify(`adding a new blog failed: ${exception}`, true,5)
      
        }
       

    render () {
    return (
    <div> 
      <h3>create new</h3>
      <form onSubmit={this.handleCreateBlog} >
        <div>
          title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div> 
  
    )
    }
  }
  
  BlogForm.propTypes = {
  //  onSubmit: PropTypes.func.isRequired,
  //  handleChange: PropTypes.func.isRequired,
  //  title: PropTypes.string.isRequired,
  //  author: PropTypes.string.isRequired,
  //  url: PropTypes.string.isRequired
  }

 
  export default connect (null, {createBlog, notify})(BlogForm)
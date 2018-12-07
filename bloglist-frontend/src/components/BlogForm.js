import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { Form, Button} from 'semantic-ui-react'

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
        
        try {
          await this.props.createBlog(this.state.title, this.state.author, this.state.url)
           
          this.props.notify(`a new blog '${this.state.title}' by ${this.state.author} added`, false, 5) 

        } catch (exception){
      
          this.props.notify(`adding a new blog failed: ${exception}`, true,5)
      
        }

      }

    render () {
    return (
    <div> 
      <h3>create new</h3>
      <Form onSubmit={this.handleCreateBlog} >
        <Form.Field>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
        <label>author</label>
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
        <label>url</label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit">create</Button>
      </Form>
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
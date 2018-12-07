import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { Form, Button} from 'semantic-ui-react'

class BlogForm extends React.Component  { 
     
      
    handleCreateBlog = async (event) => {
          event.preventDefault()

        const titleField = event.target.title
        const authorField = event.target.author
        const urlField  = event.target.url   


            
        try {
          await this.props.createBlog(titleField.value, authorField.value, urlField.value)
           
          this.props.notify(`a new blog '${titleField.value}' by ${authorField.value} added`, false, 5) 
          titleField.value = ""
          authorField.value = ""
          urlField.value = ""


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
          />
        </Form.Field>
        <Form.Field>
        <label>author</label>
          <input
            type="text"
            name="author"

          />
        </Form.Field>
        <Form.Field>
        <label>url</label>
          <input
            type="text"
            name="url"

          />
        </Form.Field>
        <Button type="submit">create</Button>
      </Form>
    </div> 
  
    )
    }
  }
  
 
  export default connect (null, {createBlog, notify})(BlogForm)
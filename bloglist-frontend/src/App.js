import React from 'react'

import './App.css'
import { connect } from 'react-redux';
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import { initializeLoggedUser } from './reducers/loginReducer';
import { initializeBlogs} from './reducers/blogReducer'
import BlogForm from './components/BlogForm'

import { BrowserRouter as Router, Route} from 'react-router-dom'
import BlogList from "./components/BlogList"
import UserList from "./components/UserList"
import {initializeUsers} from "./reducers/usersReducer"
import UserInfo from './components/UserInfo'
import BlogView from "./components/BlogView"
import { Container, Button } from 'semantic-ui-react'





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

    const buttonStyle = {
      marginTop: 10
    }

    return (
      <Container>
        <div style={hideWhenvisible}>
          <Button onClick= {this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button style={buttonStyle} onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </Container>
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
    this.props.initializeLoggedUser()
    this.props.initializeUsers()
    
  }


    

  render() {

  

    if (this.props.user === null) {
      return (
        <div>
        <h2>Blog app</h2>
        <Notification />
        <LoginForm />
        </div>
      )
    }

    return (
      <div>

 
        <h2>Blog app</h2>
        <Notification />
        <Router>
        <div> 
        <LoginInfo />        

        <Togglable buttonLabel='new blog' >
          <BlogForm
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </Togglable>

     
        <Route exact path="/" render={() => <BlogList/>} />
        <Route exact path="/users" render={() => <UserList/>} />
        <Route exact path="/users/:id" render={({match}) => <UserInfo userId={match.params.id}/>} />
        <Route exact path="/blogs/:id" render={({match}) => <BlogView blogId={match.params.id}/>} />

        </div>
        </Router>
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
  mapStateToProps, {notify, initializeLoggedUser, initializeBlogs, initializeUsers}
  )(App)

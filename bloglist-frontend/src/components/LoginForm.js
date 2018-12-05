import React from 'react'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
 
class LoginForm extends React.Component  {

    constructor (props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
      }

    handleLogin = async (event) => {
        event.preventDefault()

        try {

        await this.props.login(this.state.username, this.state.password)
        this.props.notify(`user ${this.state.username} logged in`, false, 5)

        } catch (exception) {      
            this.props.notify(`wrong username or password`, true, 5)
            console.log(exception)
        }


    }
    




    render() {

    return (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.handleLogin}>
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
    )}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps, 
    {login, notify}

)(LoginForm)
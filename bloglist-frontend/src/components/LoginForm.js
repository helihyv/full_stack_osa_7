import React from 'react'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
import { Form, Button, FormField } from 'semantic-ui-react'
 
class LoginForm extends React.Component  {

    handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        event.target.username.value = ""
        event.target.password.value = ""


        try {

        await this.props.login(username, password)

        this.props.notify(`user ${username} logged in`, false, 5)

        } catch (exception) {      
            this.props.notify(`wrong username or password`, true, 5)
            console.log(exception)
        }
    }

    render() {

    return (
    <div>
        <h2>Log in to application</h2>
        <Form onSubmit={this.handleLogin}>
        <FormField>
            <label>username</label>
            <input
            name='username'
            type='text'


            />
        </FormField>
        <FormField>
            <label>password</label>
            <input
            type="password"
            name="password"


            />
        </FormField>
        <Button type="submit" >login</Button>
        </Form>
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
import React from 'react'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 
import { BrowserRouter as Router, Link} from 'react-router-dom'



class LoginInfo extends React.Component {

    handleClick = () => {

        this.props.logout()
        this.props.notify(`user ${this.props.username} logged out`, false, 5)

    }

    render () { 
    return (

        <div> 
            <a href="/">Blogs</a>
            <a href="/users">Users</a>
            {this.props.username} logged in <button type="button" onClick={this.handleClick} >logout</button>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        username: state.user ? state.user.username : null
    }
}

export default connect (mapStateToProps,
     {logout, notify}
    )(LoginInfo)
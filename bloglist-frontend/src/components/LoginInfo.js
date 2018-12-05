import React from 'react'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 
import { BrowserRouter as Router, Link} from 'react-router-dom'



class LoginInfo extends React.Component {

    handleClick = () => {

        this.props.logout()
        this.props.notify(`user ${this.props.userFullName} logged out`, false, 5)

    }

    render () { 
    return (

        <div> 
            <a href="/">Blogs</a> &nbsp;
            <a href="/users">Users</a>&nbsp;
            <em> {this.props.userFullName} logged in </em><button type="button" onClick={this.handleClick} >logout</button>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        userFullName: state.user ? state.user.name : null
    }
}

export default connect (mapStateToProps,
     {logout, notify}
    )(LoginInfo)
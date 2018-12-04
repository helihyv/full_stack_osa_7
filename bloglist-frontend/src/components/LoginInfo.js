import React from 'react'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 



class LoginInfo extends React.Component {

    handleClick = () => {

        this.props.logout()
        this.props.notify(`user ${this.props.username} logged out`, false, 5)

    }

    render () { 
    return (
        <p> {this.props.username} logged in <button type="button" onClick={this.handleClick} >logout</button></p>
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
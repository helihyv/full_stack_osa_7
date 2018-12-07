import React from 'react'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 
import { Button, Menu} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class LoginInfo extends React.Component {

    handleClick = () => {

        this.props.logout()
        this.props.notify(`user ${this.props.userFullName} logged out`, false, 5)

    }

    render () { 
    return (

        <Menu inverted> 
            <Menu.Item link>
                <NavLink to="/">Blogs</NavLink>
            </Menu.Item>

            <Menu.Item link>
                <NavLink to="/users">Users</NavLink>
            </Menu.Item>
            <Menu.Item>
                <em> {this.props.userFullName} logged in</em> 
            </Menu.Item>
            <Menu.Item>
                <Button type="button" onClick={this.handleClick} >logout</Button>
            </Menu.Item>
        </Menu>
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
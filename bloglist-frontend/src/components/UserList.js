import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {
    console.log(props)
    return (<div>
        <h2>Users</h2>
        <table>
        <tr><td></td><td><h3>blogs added</h3></td></tr>
        {props.users.map((user) => <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </table>

    </div>)
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect (mapStateToProps)(UserList)
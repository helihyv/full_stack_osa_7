import React from "react"
import { connect } from "react-redux"
//import { BrowserRouter as Link } from "react-router-dom"

const UserList = (props) => {
  console.log(props)
  return (<div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr><td></td><td><h3>blogs added</h3></td></tr>
        {props.users.map((user) =>
          <tr key={user._id}><a href={`/users/${user._id}`}><td>{user.name}</td></a><td>{user.blogs.length}</td></tr>)}
      </tbody>
    </table>

  </div>)
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default connect (mapStateToProps)(UserList)
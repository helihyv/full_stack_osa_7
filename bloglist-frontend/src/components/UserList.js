import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "semantic-ui-react"

const UserList = (props) => {

  return (<div>
    <h2>Users</h2>
    <Table striped>
      <Table.Header>
        <Table.Row><Table.HeaderCell></Table.HeaderCell><Table.HeaderCell><h3>blogs added</h3></Table.HeaderCell></Table.Row>
      </Table.Header>
      <Table.Body>

        {props.users.map((user) =>
          <Table.Row key={user._id}><Table.Cell><Link to={`/users/${user._id}`}>{user.name}</Link></Table.Cell><Table.Cell>{user.blogs.length}</Table.Cell></Table.Row>)}
      </Table.Body>
    </Table>

  </div>)
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default connect (mapStateToProps)(UserList)
import React from "react"
import Blog from "./Blog"
import { connect } from "react-redux"
import { Table } from "semantic-ui-react"

const BlogList = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      <Table striped >
        <Table.Body>
          {props.blogs
            .map(blog =>
              <Blog key={blog._id} blog={blog}/>
            )}
        </Table.Body>
      </Table>
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)


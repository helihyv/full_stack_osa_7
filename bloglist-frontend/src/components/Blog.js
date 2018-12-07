import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table } from "semantic-ui-react"

const Blog = ({ blog }) => {


  return (
    <Table.Row id={blog._id}>
      <Table.Cell>
        <Link to= {`/blogs/${blog._id}`}>{blog.title} </Link>
      </Table.Cell>
      <Table.Cell>
        {blog.author}
      </Table.Cell>
    </Table.Row>
  )

}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    _id: PropTypes.isRequired

  }).isRequired
}

export default Blog
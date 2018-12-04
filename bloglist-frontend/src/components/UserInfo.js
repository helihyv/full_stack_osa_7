import React from 'react'
import { connect } from 'react-redux'
import blogReducer from '../reducers/blogReducer';


const UserInfo = (props) => {

 
    const user = props.users.find((user) => user._id === props.userId)

    console.log(props)

    if (user === undefined) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map((blog) => <li key={blog._id}>The {blog.title} by {blog.author} </li> )}
            </ul>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect (mapStateToProps)(UserInfo)

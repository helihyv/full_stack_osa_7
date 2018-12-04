import React from 'react'
import { connect } from 'react-redux'


const UserInfo = (props) => {

 
    const user = props.users.find((user) => user._id === props.userId)

    console.log(props)

    return (
        <div>
            <h1>{user.name} käytttäjä {props.userId}</h1>
        </div>
    )

}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        users: state.users
    }
}

export default connect (mapStateToProps)(UserInfo)

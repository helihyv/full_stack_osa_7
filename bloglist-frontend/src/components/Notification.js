import React from "react"
import { connect } from "react-redux"
import { Message } from "semantic-ui-react"

const Notification = ({ message, isError }) => {
  if (message === "") {
    return null
  }


  return (
    <Message error={isError} success={!isError} >
      {message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.text,
    isError: state.notification.isError
  }
}

export default connect(
  mapStateToProps
)(Notification)


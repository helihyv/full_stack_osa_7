import React from "react"
import { connect } from "react-redux"

const Notification = ({ message, isError }) => {
  if (message === "") {
    return null
  }
  return (
    <div className={isError ? "error" : "notification"}>
      {message}
    </div>
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


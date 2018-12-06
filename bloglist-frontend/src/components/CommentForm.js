import React from 'react'
import { setCommentField } from './../reducers/commentFormFieldReducer'
import { notify } from './../reducers/notificationReducer'
import { addComment } from './../reducers/blogReducer'
import { connect } from 'react-redux' 

const addNewComment = (blog, comment, addCommentFunction,notifyFunction) => async (event) => {
    event.preventDefault()
 
    try {
        await addCommentFunction(comment, blog._id)
        notifyFunction(`comment '${comment}' added to blog '${blog.title}'`, false, 5)
    } catch (exception) {
        notifyFunction(`failed to add the comment: ${exception}`, true, 5)
    }
}

const handleValueChange = (setCommentFieldFunction) => (event) => {
    setCommentFieldFunction(event.target.value)
}

const CommentForm = (props) => {
    return (
        <form onSubmit={addNewComment(props.blog, props.commentField, props.addComment, props.notify)}>
            <input 
                type="text" 
                name="comment"
                value={props.commentField}
                onChange={handleValueChange(props.setCommentField)}
            />
            <button type="submit">add comment</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return({
        commentField: state.commentField
    })
}

export default connect (
    mapStateToProps,
    {setCommentField,notify,addComment}
    )(CommentForm)
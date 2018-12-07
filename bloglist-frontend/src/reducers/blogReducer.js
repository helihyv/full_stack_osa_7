import blogService from "./../services/blogs"

const initialState = []

const blogReducer = (store = initialState, action) => {
  switch(action.type) {
  default:
    return store
  case "INIT_BLOGS":
    return action.blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})
  case "CREATE_BLOG":
    let blogs = store
    blogs = blogs.concat(action.blog)
    return blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})

  case "DELETE":
    return store.filter(a => a._id !== action.id)

  case "ADD_LIKE":
    const old  = store.filter(a => a._id !== action.id)
    const liked = store.find(a => a._id === action.id)
    const updatedBlogs = [...old, { ...liked, likes: liked.likes +1 }]
    return updatedBlogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})

  case "ADD_COMMENT":
    const oldBlogs = store.filter(a => a._id !== action.id)
    const commented = store.find(a => a._id === action.id)
    let updatedComments = commented.comments ? commented.comments : []
    updatedComments = updatedComments.concat(action.comment)
    return [...oldBlogs, { ...commented, comments: updatedComments }]

  }

}


export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: "INIT_BLOGS",
      blogs
    })
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create( {
      title,
      author,
      url
    })
    dispatch({
      type: "CREATE_BLOG",
      blog: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: "DELETE",
      id
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {

    await blogService.update( { ...blog, likes: blog.likes +1 })

    dispatch({
      type: "ADD_LIKE",
      id: blog._id
    })
  }
}

export const addComment = (comment, blogId) => {
  return async (dispatch) => {

    await blogService.createComment(comment, blogId)

    dispatch({
      type: "ADD_COMMENT",
      id: blogId,
      comment
    })
  }
}

export default blogReducer



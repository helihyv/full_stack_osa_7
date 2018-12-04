import blogService from "./../services/blogs"

const initialState = []

const blogReducer = (store = initialState, action) => {
  switch(action.type) {
  default:
    return store
  case "INIT_BLOGS":
    return action.blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})
  case "CREATE":
    console.log("Saako täällä logata")
    console.log(store)
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
  console.log("Tänne ei piätisi laittaa mitään")
  return async (dispatch) => {
    console.log("creating on server")
    const newBlog = await blogService.create( {
      title,
      author,
      url
    })
    console.log("blog created on server")
    dispatch({
      type: "CREATE",
      blog: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    console.log("blog deleted from server")
    dispatch({
      type: "DELETE",
      id
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = blog
    updatedBlog.likes = updatedBlog.likes + 1

    await blogService.update(updatedBlog)

    dispatch({
      type: "ADD_LIKE",
      id: blog._id
    })
  }
}

export default blogReducer



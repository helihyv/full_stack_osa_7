import blogService from './../services/blogs'

const initialState = []

const blogReducer = (store = initialState, action) => {
    switch(action.type) {
        default:
            return store
        case 'INIT_BLOGS':
            return action.blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})
        case 'CREATE':
            console.log(store)
            const blogs = store.concat(action.blog)
            return blogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})

        case 'DELETE':
             console.log(store)
            const blogToRemove = store.find((blog) => blog.id === action.id)
            const allBlogs = store
            allBlogs.remove(blogToRemove)
            return blogs
        
        case 'ADD_LIKE':
            console.log(action)
            const old  = store.filter(a => a._id !== action.id)
            console.log(old)
            const liked = store.find(a => a._id === action.id)
            const updatedBlogs = [...old, {...liked, likes: liked.likes +1}]
            return updatedBlogs.sort((blog_a,blog_b) => {return blog_b.likes - blog_a.likes})

    }
}


    export const initializeBlogs = () => {
        return async (dispatch) => {
            const blogs = await blogService.getAll()

            dispatch({
                type: 'INIT_BLOGS',
                blogs
            })
        }
    }

    export const createBlog = () => {
        return async (dispatch) => {
            const newBlog = await blogService.create()
            console.log("blog created on server")
            dispatch({
                type: 'CREATE',
                blog: newBlog
            }) 
        }
    }

    export const deleteBlog = (id) => {
        return async (dispatch) => {
            await blogService.remove(id)
            console.log("blog deleted from server")
            dispatch({
                type: 'DELETE',
                id
            })
        }
    }

    export const addLike = (blog) => {
    return async (dispatch) => {
        const updatedBlog = blog
        updatedBlog.likes = updatedBlog.likes + 1
        console.log(updatedBlog)
        await blogService.update(updatedBlog)
        console.log("blog updated on server")
    
        dispatch({
            type: 'ADD_LIKE',
            id: blog._id
        })
    } 
}

    export default blogReducer



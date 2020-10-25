const initialState = []

const BlogReducer = (state = initialState, action) => {

    if (action.type === 'POPULATE') {
        return action.value

    } else if (action.type === 'ADD') {
        return state.concat(action.blog)

    } else if (action.type === 'DELETE') {
        return state.filter((blog) => {
            return blog.id !== action.blogId
        })

    } else if (action.type === 'INCREMENT_LIKE') {
        return state.map(blog => blog.id !== action.blog.id ? blog : action.blog)

    } else if (action.type === 'ADD_COMMENT') {
        let BlogToUpdate = state.find(blog => blog.id === action[1])
        let updatedBlog ={ ...BlogToUpdate, comments: BlogToUpdate.comments.concat(action[0]) }
        return state.concat(updatedBlog)

    } else {
        return state
    }
}

export default BlogReducer


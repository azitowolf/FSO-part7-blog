import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import PropTypes from 'prop-types'

const HomePage = ({ blogs, incrementLikesForBlog, deleteBlog, handleAddBlogToServer, user, handleLogout }) => {

    // render functions
    const blogsList = () => {
        const reduxBlogs = blogs
        const sortByLikesDescending = (a,b) => {
            if(a.likes > b.likes){
                return -1
            } else if(a.likes > b.likes){
                return 1
            } else{
                return 0
            }
        }
        if(reduxBlogs === undefined) {
            return 'No blogs found or connection to internet is severed'
        }
        return reduxBlogs
            .sort(sortByLikesDescending)
            .map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    incrementLikesForBlog={incrementLikesForBlog}
                    deleteBlog={deleteBlog} />
            )
    }

    const renderBlogForm = () => (
        <Togglable buttonLabel='create a new post'>
            <BlogForm addBlogToServer={handleAddBlogToServer} />
        </Togglable>
    )

    return (
        <div className="container">
            <img src="https://www.flaticon.com/svg/static/icons/svg/172/172163.svg" style={{width:'2em'}}/>
            <p>Logged in as {user.name}</p> 
            <button className="btn btn-primary" onClick={handleLogout}> Log out </button>
            <h2>Add a New Blog</h2>
            {renderBlogForm()}
            <h2>View Blogs</h2>
            <div className='blogsList'>
                {blogsList()}
            </div>
        </div>
    )
}

HomePage.propTypes = {
    incrementLikesForBlog: PropTypes.func,
    deleteBlog: PropTypes.func,
    handleAddBlogToServer: PropTypes.func,
    handleLogout: PropTypes.func
}

export default HomePage
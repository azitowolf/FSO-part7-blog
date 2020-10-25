import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogPage = ({ incrementLikesForBlog, deleteBlog }) => {
    console.log('rendering home page')
    const appStoreData = useSelector(state => state)

    // render functions
    const blogsList = () => {
        
        const reduxBlogs = appStoreData.blogs
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


    return (
        <div className="container">
            <h2>Blogs</h2>
            <div className='blogsList'>
                {blogsList()}
            </div>

        </div>
    )
}

export default BlogPage
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (props) => {
    const handleLikeClick = (event) => {
        event.preventDefault()
        props.incrementLikesForBlog(props.blog.id)
    }
    const handleDeleteClick = (event) => {
    // prevent event, call higher level comp func
        event.preventDefault()
        props.deleteBlog(props.blog.id)
    }
    return (
        <div className='blogComponent'>
            <Link to={`/blog/${props.blog.id}`}> <div className="blogTitle">{props.blog.title}</div></Link>
            <div className='url'>{props.blog.url}</div>
            <div className='likes'>{props.blog.likes} likes </div>
            <button className="btn btn-danger" onClick={handleDeleteClick} id='deleteBlogButton'>delete blog</button>
            <button className="btn btn-info" onClick={handleLikeClick}>like blog</button>
        </div>
    )}

export default Blog

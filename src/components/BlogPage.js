import React, { useState } from 'react'
import blogService from './../services/blogs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useTextField = () => {
    const [inputs, setInputs] = useState({})
    const handleInputChange = (event) => {
        event.preventDefault()
        let x = event.target.name
        let y = event.target.value
        setInputs({ [x] : y })
    }
    return {
        handleInputChange,
        inputs
    }
}

const BlogPage = (props) => {
    const [blog, setBlog] = useState(null)
    const blogId = props.match.params.blogId
    const dispatch = useDispatch()
    const { inputs, handleInputChange } = useTextField()


    useEffect(() => {
        blogService.getOne(blogId)
            .then(result => {
                setBlog(result)
            })},[])

    // utility functions
    const setNotificationTimer = (content) => {
        dispatch({
            type: 'NOTIFY',
            message: content
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFY',
                message: null
            })
        }, 5000)
    }
    const handlePostCommentToServer = (commentBody = 'test') => {

        blogService
            .createComment(commentBody, blog.id)
            .then(returnedComment => {
                setBlog({ ...blog, comments: blog.comments.concat({ commentBody, blogId }) })
                setNotificationTimer('successfully added your comment!')
            })
            .catch((exception) => {
                setNotificationTimer(`error caught - ${exception.message}`)
            })
    }
    const incrementLikesForBlog = () => {
        const blogObject = blog
        blogService
            .update(blogId, { likes:blogObject.likes + 1 })
            .then(() => {
                setBlog({ ...blog, likes: blog.likes += 1 })
                setNotificationTimer('liked!')
            })
            .catch((exception) => setNotificationTimer('error processing your request: ' + exception))
    }

    if(blog) return (
        <div className='blogComponent'>
            <div className="container">

                <h2 className="blogTitle">{blog.title}</h2>
                <div className='url'>{blog.url}</div>
                <div className='likes'>{blog.likes}</div>

                <button className="btn btn-info" onClick={incrementLikesForBlog}>like</button>

                <h3>About the author</h3>
                {blog.author &&
                        <div>
                            <div>{blog.author.name}</div>
                            <div>{blog.author.username}</div>
                            <div>{`his user id: ${blog.author.id}`}</div>
                        </div>
                }

                <h3>Comments</h3>
                <input name="commentBody" onChange={handleInputChange} value={inputs.commentBody}/>
                <button className="btn btn-info" onClick={() => handlePostCommentToServer(inputs.commentBody)} id='postCommentButton'>Comment</button>
                {
                    blog.comments.length && blog.comments.map((comment, index) => {
                        return <div key={index}>{comment.commentBody}</div>
                    })
                }
            </div>

        </div>
    )
    return <div>Loading...</div>
}

export default BlogPage

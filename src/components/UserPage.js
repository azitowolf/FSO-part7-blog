import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserPage = ({ match }) => {
    const [user, setUser] = useState(null)
    let userMarkup
    useEffect(() => {
        userService.getOne(match.params.userId).then(result => {
            setUser(result)
        })
        return () => {
            console.log('cleaning up the userpage ')
        }
    }, [])

    if (user)
        userMarkup = (
            <div className="container">
                <h2> {user.name}s Blogs </h2>
                <div className="container user-page-blogs-list">
                    {user.blogs.length === 0 ? <div>This user hasn&apost posted any blogs yet</div> : ''}
                    {user.blogs.map((blog) => {
                        return (
                            <div key={blog.id}>
                                {blog.title}
                                <Link to={`/blog/${blog.id}`}> Link to Blog</Link>
                            </div>)
                    })}
                </div>
            </div>
        )
    else {
        userMarkup = <h2> Sorry. User doesn&apost exist </h2>
    }

    return (
        <div>
            {userMarkup}
        </div>
    )
}

UserPage.propTypes = {

}

export default UserPage


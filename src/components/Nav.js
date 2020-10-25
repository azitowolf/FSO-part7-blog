import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import { Link } from 'react-router-dom'

const Nav = () => {
    const appStoreData = useSelector(state => state)
    return (
        <>
            <nav className="navbar navbar-light bg-light" style={{justifyContent:'flex-start'}}>
                <a className="navbar-brand" href="#">BlogSter</a>
                <Link to="/" style ={{margin:'1rem'}}>Home</Link>
                <Link to="/users" style ={{margin:'1rem'}}>Users</Link>
                <Link to="/blogs" style ={{margin:'1rem'}}>Blogs</Link>
            </nav>
            <Notification notification={appStoreData.notification} />
        </>
    )
}

export default Nav
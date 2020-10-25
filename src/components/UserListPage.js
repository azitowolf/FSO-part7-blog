import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserListPage = () => {
    const appStoreData = useSelector(state => state)
    return (
        <div>
            <div className="container">
                <h2>Users</h2>
                {appStoreData.users && appStoreData.users.map((user) => {
                    return (
                        <p key={user.id}>
                            <img src="https://www.flaticon.com/svg/static/icons/svg/172/172163.svg" style={{width:'2em'}}/> 
                            {user.username} 
                            <Link to={`/user/${user.id}`}> View User Info </Link> 
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default UserListPage


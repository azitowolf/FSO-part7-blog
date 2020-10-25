import React from 'react'
import PropTypes from 'prop-types'

const LoginPage = ({ handleLogin, username, setUsername, password, setPassword }) => {

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
    user: PropTypes.object
}

export default LoginPage
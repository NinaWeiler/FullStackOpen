import React from 'react';


const LoginForm = ({handleLogin, setUsername, setPassword, username, password}) => {
    return (
    <div>
      
      <form onSubmit={handleLogin}>
        <div>
          username 
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
)      
}

export default LoginForm;
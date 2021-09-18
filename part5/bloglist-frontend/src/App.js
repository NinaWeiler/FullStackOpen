import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // token returned is saved to state user
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      // sets token to local storage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)

      })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)){
      blogService
        .remove(blog.id)
        .then(response => {
          console.log(response)
          setBlogs(blogs.filter((b) => b.id !== blog.id))
        })
    } else { return }
  }

  const handleLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        setErrorMessage(
          'Error adding like'
        )
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })

  }


  if (user === null) {
    return (
      <>
        <h2>Sign in</h2>
        <Notification message={errorMessage} className="error"/>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </>
    )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} className={'success'}/>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>log out</button>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={handleLike} removeBlog={deleteBlog} user={user.username} />
      ))}

    </div>
  )

}
export default App

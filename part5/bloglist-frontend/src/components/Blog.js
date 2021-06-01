import React, { useState } from 'react'

const Details = ({ blog, user, handleLike, handleDelete }) => {

  return (
    <div className='details'>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={handleLike}>like</button></p>
      <p>{blog.user.username}</p>
      {user !== blog.user.username ? null : <button onClick={handleDelete}>remove</button> }
    </div>
  )

}

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [text, setText] = useState('show')

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
    if (text === 'show') {
      setText('hide')
    } else {
      setText('show')
    }
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility} text={text}>{text}</button></p>
      {!detailsVisible ? null
        : <Details blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/> }
    </div>
  )
}

export default Blog
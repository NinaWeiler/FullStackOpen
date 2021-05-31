import React, { useState } from 'react';

const Details = ({blog, blogObject}) => {

  const handleLike = (event) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1}
    blogObject(blog.id, updatedBlog)
  }

  return (
    <>
    <p>{blog.url}</p>
    <p>{blog.likes}<button onClick={handleLike}>likes</button></p>
    <p>{blog.user.username}</p>
    </>
  )

}

const Blog = ({blog, blogObject}) => {
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

  return (
  <div style={blogStyle}>
    <p>{blog.title} {blog.author} <button onClick={toggleVisibility} text={text}>{text}</button></p>
    {!detailsVisible ? null 
    : <Details blog={blog} blogObject={blogObject} /> }
  </div> 
  ) 
}

export default Blog
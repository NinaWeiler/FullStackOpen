import React, { useState } from 'react'

const Details = ({url, likes, user}) => {
  return (
    <>
    <p>{url}</p>
    <p>{likes}<button>likes</button></p>
    <p>{user}</p>
    </>
  )

}

const Blog = ({blog}) => {
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
    : <Details url={blog.url} likes={blog.likes} user={blog.user.username}/> }
  </div> 
  ) 
}

export default Blog
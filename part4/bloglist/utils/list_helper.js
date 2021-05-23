const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 1
  }

const totalLikes = (blogs) => {
    /*if (blogs.length === 0) {
        return 0
    } */
    return blogs.reduce((n, {likes}) => n + likes, 0)
} 

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(n => n.likes), 0)
    const result = blogs.find(blog => blog.likes === mostLikes)
    const resultObject = result ? {
        title: result.title,
        author: result.author,
        likes: result.likes
    } : null
    return resultObject
}
  

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

const dummy = (blogs) => {
    return blogs.length === 0 ? 1 : 1
  }

const totalLikes = (blogs) => {
    /*if (blogs.length === 0) {
        return 0
    } */
    return blogs.reduce((n, {likes}) => n + likes, 0)
} 
  

module.exports = {
    dummy,
    totalLikes
}

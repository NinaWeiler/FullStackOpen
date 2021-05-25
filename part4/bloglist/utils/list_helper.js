const _ = require('lodash')

const dummy = (blogs) => {
	return blogs.length === 0 ? 1 : 1
}

const totalLikes = (blogs) => {
	/*if (blogs.length === 0) {
        return 0
    } */
	return blogs.reduce((n, { likes }) => n + likes, 0)
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

const mostBlogs = (blogs) => {
    if (blogs.length === 0)  return null
    const sorted = _.groupBy(blogs, 'author')
    const blogsPerAuthor = _.mapValues(sorted, (o) => o.length)
    const mostBlogs = Object.entries(blogsPerAuthor).reduce((a,b) => a[1] > b[1] ? a : b)
    return { 'author': mostBlogs[0], 'blogs': mostBlogs[1] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)  return null
    const sorted = _.groupBy(blogs, 'author')
    const authorsAndLikes = _.mapValues(sorted, totalLikes)
    const mostLikedAuthor = Object.entries(authorsAndLikes).reduce((a,b) => a[1] > b[1] ? a : b)
    return { 'author': mostLikedAuthor[0], 'likes': mostLikedAuthor[1] }

}
//_.chain(blogs).groupBy(n => [n.author, n.likes]).keys().map(n => _.split(n, ',)).value();
// sortBY

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
    mostBlogs,
    mostLikes
}

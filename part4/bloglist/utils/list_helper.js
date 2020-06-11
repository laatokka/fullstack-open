const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  if (blogPosts.length > 1) {
    const sum = blogPosts
      .map((blog) => blog.likes)
      .reduce(reducer, 0)

    return sum
  }

  return blogPosts.length === 0
    ? 0
    : blogPosts[0].likes
}

const favoriteBlog = (blogPosts) => {
  const mostLikes = blogPosts
    .map((blog) => blog.likes)
    .reduce((a, b) => {
      return Math.max(a, b)
    })


  const { title, author, likes } = blogPosts.find((blog) => blog.likes === mostLikes)

  return {
    title, author, likes
  }
}

const mostBlogs = (blogPosts) => {
  const grouped = _.groupBy(blogPosts, (blog) => blog.author)

  const authors = _.map(grouped, (blog) => ({
    author: blog[0].author,
    blogs: blog.length
  }))

  const orderBy = _.orderBy(authors, ['blogs'], ['desc'])
  return orderBy[0]

}

const mostLikes = (blogPosts) => {
  const grouped = _.groupBy(blogPosts, (blog) => blog.author)

  const authors = _.map(grouped, (author) => {
    const likes = author.reduce((sum, blog) => sum + blog.likes, 0)
    
    return ({ author: author[0].author, likes })
  })
  
  const orderBy = _.orderBy(authors, ['likes'], ['desc'])
  return orderBy[0]

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
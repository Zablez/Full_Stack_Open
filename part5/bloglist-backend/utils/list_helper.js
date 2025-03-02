const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum += blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    let topLikes = 0;
    let topBlog = null;

    blogs.forEach((blog) => {
        const { title, author, likes } = blog;

        if (topLikes < blog.likes) {
            topLikes = blog.likes
            topBlog = { title, author, likes }
        }
    })

    return topBlog
}

const mostBlogs = (blogs) => {
    let result = new Map([]);

    blogs.forEach((blog) => {
        const { author } = blog
        const noOfBlogs = blogs.filter((blog) => blog.author === author).length

        result.set(author, noOfBlogs)
    })

    let topBlogNum = 0;
    let topAuthor;

    result.forEach((value, key) => {
        if (value > topBlogNum) {
            topAuthor = { author: key, blogs: value }
        }
    })

    return topAuthor;
}

const mostLikes = (blogs) => {
    let count = new Map([])

    blogs.forEach((blog) => {
        const { author, likes } = blog;
        count.set(author, (count.get(author) || 0) + likes)
    })

    let topLikes = 0;
    let topLikesAuthor;
    
    count.forEach((value, key) => {
        if (value > topLikes) {
            topLikes = value
            topLikesAuthor = { author: key, likes: value }
        }
    })

    return topLikesAuthor;
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
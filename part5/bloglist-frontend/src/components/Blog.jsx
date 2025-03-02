import { useState } from 'react'

const Blog = ({ user, blog, handleLike, deleteBlog }) => {
  const [isShown, setIsShown] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    handleLike(blog)
  }

  const deleteBlogById = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>
        <button id='view-btn' onClick={() => setIsShown(!isShown)}>
          view
        </button>
      </div>

      {isShown && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button id='like-btn' onClick={addLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {user && blog.user.username === user.username && (
            <button id='delete-btn' onClick={deleteBlogById}>
              remove
            </button>
          )}
          <br />
        </>
      )}
    </div>
  );
}

export default Blog

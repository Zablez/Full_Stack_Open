/** @format */

import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';
import Notification from './components/Notification.jsx';
import './index.css';
import LoginForm from './components/LoginForm.jsx';
import BlogForm from './components/BlogForm.jsx';
import Togglable from './components/Toggle.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [isError, setIsError] = useState(false);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();

    setBlogs(() => blogs.sort((a, b) => b.likes - a.likes));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggerUserJson = window.localStorage.getItem('loggedUser');
    console.log(loggerUserJson);
    if (loggerUserJson) {
      const userb = JSON.parse(loggerUserJson);
      setUser(userb);
      blogService.setToken(userb.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotification('login success');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setIsError(true);
      setNotification('Wrong credentials');
      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreateBlog = async (blogObj) => {
    try {
      const response = await blogService.createBlog(blogObj);
      fetchBlogs();

      setNotification(
        `A new blog ${response.title} by ${response.author} added`
      );
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 5000);
    } catch (error) {
      setIsError(true);
      setNotification('Failed to create blog');
      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    try {
      console.log('err');
      await blogService.likeBlog(blog);

      setNotification('Blog liked');
      fetchBlogs();
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setIsError(true);
      setNotification('Failed to like blog');
      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 5000);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const toDelete = confirm(`Remove ${blog.title} by ${blog.author}`);

      if (!toDelete) return;

      await blogService.deleteBlog(blog.id);

      setNotification('Blog deleted');
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      fetchBlogs();
    } catch (error) {
      setIsError(true);
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification(null);
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification type={isError ? 'error' : ''} text={notification} />
      {!user && (
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={setUsername}
            handlePasswordChange={setPassword}
          />
        </Togglable>
      )}

      {user && (
        <>
          <h2>blogs</h2>

          <div>
            {`${user.name} logged in`}
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <br />

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleCreateBlog={handleCreateBlog}
              handleTitleChange={setTitle}
              handleAuthorChange={setAuthor}
              handleUrlChange={setUrl}
            />
          </Togglable>
          <br />
          <br />

          {blogs.map((blog) => (
            <Blog
              user={user}
              deleteBlog={deleteBlog}
              handleLike={handleLike}
              key={blog.id}
              blog={blog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;

/** @format */
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <>
      <h2>Login in to application</h2>
      <form id='login-form' onSubmit={handleLogin}>
        <label>username</label>
        <input
          type='text'
          value={username}
          name='username'
          id='username'
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
        <br />

        <label>password</label>
        <input
          type='password'
          value={password}
          name='password'
          id='password'
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
        <br />

        <button id='login-btn' type='submit'>
          login
        </button>
      </form>
    </>
  );
}

export default LoginForm


LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}


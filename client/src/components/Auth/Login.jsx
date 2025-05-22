import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Inline CSS styles for the login/register/forgot password UI
const styles = `
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 3px 6px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 500px;
  margin: 40px auto;
  display: flex;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  width: 50%;
  padding: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-container {
  left: 0;
  z-index: 2;
}
.register-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}
.container.right-panel-active .login-container {
  transform: translateX(100%);
  opacity: 0;
  z-index: 1;
}
.container.right-panel-active .register-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 2;
}
.forgot-password-container {
  width: 100%;
  padding: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.overlay {
  background: #d32f2f;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.overlay-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
  left: 0;
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
input, button {
  margin: 8px 0;
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}
button {
  background: #d32f2f;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
button.ghost {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin-top: 20px;
}
button:hover, button.ghost:hover {
  background: #b71c1c;
  color: #fff;
}
label {
  text-align: left;
  margin-bottom: 4px;
  font-weight: 500;
}
.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.remember-me input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}
.forgot-password {
  color: #d32f2f;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
}
.message {
  color: #d32f2f;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}
@media (max-width: 900px) {
  .container, .form-container, .forgot-password-container {
    width: 100%;
    min-width: 0;
    padding: 20px;
  }
  .overlay-container, .overlay, .overlay-panel {
    display: none;
  }
}
`;

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const togglePanel = () => {
    setIsLoginActive(!isLoginActive);
    setMessage('');
    setIsForgotPasswordActive(false);
    setLoginUsername('');
    setLoginPassword('');
    setRegisterUsername('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginUsername && loginPassword) {
      try {
        const payload = {
          username: loginUsername,
          password: loginPassword,
        };

        const response = await axios.post(`${API_URL}/api/auth/login`, payload, {
          withCredentials: true,
        });

        if (response.data.message === 'Login successful') {
          setMessage('Login successful!');
          localStorage.setItem('auth', 'true');
          localStorage.setItem('user', JSON.stringify(response.data.user));

          if (rememberMe) {
            localStorage.setItem('rememberMe', JSON.stringify({ username: loginUsername, password: loginPassword }));
          } else {
            localStorage.removeItem('rememberMe');
          }

          login();
          navigate('/');
        } else {
          setMessage(response.data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        setMessage('An error occurred while logging in. Please try again.');
      }
    } else {
      setMessage('Please enter both username and password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerUsername || !registerEmail || !registerPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const payload = {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      };

      const response = await axios.post(`${API_URL}/api/auth/register`, payload);

      if (response.data.message === 'Registration successful!') {
        setMessage('Registration successful! You can now log in.');
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPassword('');
        setTimeout(() => togglePanel(), 1000);
      } else {
        setMessage(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while registering. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotNewPassword || !forgotConfirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const payload = {
        email: forgotEmail,
        newPassword: forgotNewPassword,
      };

      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, payload);

      if (response.data.message === 'Password reset successful') {
        setMessage('Password reset successful! You can now log in.');
        setForgotEmail('');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
        setTimeout(() => setIsForgotPasswordActive(false), 1000);
      } else {
        setMessage(response.data.message || 'Password reset failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while resetting your password. Please try again.');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`container${isLoginActive ? '' : ' right-panel-active'}`}>
        {!isForgotPasswordActive ? (
          <>
            {/* Login Form */}
            <div className="form-container login-container">
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <label htmlFor="login-username">Username</label>
                <input
                  id="login-username"
                  type="text"
                  placeholder="Enter your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Remember Me</label>
                </div>
                <button type="submit">Login</button>
                <p className="forgot-password" onClick={() => setIsForgotPasswordActive(true)}>
                  Forgot Password?
                </p>
                {message && <p className="message">{message}</p>}
              </form>
            </div>

            {/* Register Form */}
            <div className="form-container register-container">
              <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <label htmlFor="register-username">Username</label>
                <input
                  id="register-username"
                  type="text"
                  placeholder="Enter your username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <label htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                {message && <p className="message">{message}</p>}
              </form>
            </div>
          </>
        ) : (
          <div className="form-container forgot-password-container">
            <form onSubmit={handleForgotPassword}>
              <h2>Forgot Password</h2>
              <label htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <label htmlFor="forgot-new-password">New Password</label>
              <input
                id="forgot-new-password"
                type="password"
                placeholder="Enter your new password"
                value={forgotNewPassword}
                onChange={(e) => setForgotNewPassword(e.target.value)}
              />
              <label htmlFor="forgot-confirm-password">Confirm Password</label>
              <input
                id="forgot-confirm-password"
                type="password"
                placeholder="Confirm your new password"
                value={forgotConfirmPassword}
                onChange={(e) => setForgotConfirmPassword(e.target.value)}
              />
              <button type="submit">Save</button>
              {message && <p className="message">{message}</p>}
            </form>
          </div>
        )}

        {/* Overlay Panel */}
        {!isForgotPasswordActive && (
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>Welcome Back!</h2>
                <p>To keep connected, please login with your personal info</p>
                <button className="ghost" onClick={togglePanel}>
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Hello, Friend!</h2>
                <p>Enter your personal details and start your journey with us</p>
                <button className="ghost" onClick={togglePanel}>
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
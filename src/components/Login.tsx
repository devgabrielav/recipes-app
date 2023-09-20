function Login() {
  return (
    <div>
      <h2>Login</h2>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;

import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "../hooks/useAuth";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const rememberMe = (
      form.elements.namedItem("rememberMe") as HTMLInputElement
    ).checked;

    // Mock authentication logic
    const token = "your_mocked_token";
    login(token, rememberMe);
    void navigate({ to: "/info" });
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="input-wrap active">
              <span className="label">Username</span>
              <input type="text" id="username" name="username" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="input-wrap active">
              <span className="label">Password</span>
              <input type="password" id="password" name="password" />
            </label>
          </div>
          <div className="form-group form-flex-row">
            <div className="checkbox-row form-flex-row">
              <div className="checkbox-item">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
              </div>
              <label htmlFor="rememberMe" className="label">
                Remember me
              </label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-turing-small-yellow">
              <span className="caption">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

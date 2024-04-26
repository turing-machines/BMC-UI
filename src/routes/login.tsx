import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import TextInput from "../components/TextInput";
import { useAuth } from "../hooks/useAuth";
import { useLoginMutation } from "../services/api/set";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      const redirectPath = (search as { redirect: string }).redirect || "/info";
      throw redirect({ to: redirectPath });
    }
  },
  component: Login,
});

function Login() {
  const { mutate: mutateLogin } = useLoginMutation();
  const [message, setMessage] = useState("");
  const { login } = useAuth();

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

    mutateLogin(
      { username, password },
      {
        onSuccess: (data) => {
          setMessage("");
          login(data.id, rememberMe);

          // force refresh the same page, natively
          window.location.reload();
        },
        onError: (error) => {
          setMessage(error.message);
        },
      }
    );
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-form">
          <h3 className="login-title">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextInput name="username" label="Username" />
            </div>
            <div className="form-group">
              <TextInput name="password" label="Password" type="password" />
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
            <div className="form-group">
              <p className="error-message" id="responseMessage">
                {message}
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="copyright-login">
        <p className="copyright-login__text">© TURING MACHINES INC.</p>
      </div>
    </div>
  );
}

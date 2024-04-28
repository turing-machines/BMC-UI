import { Link } from "@tanstack/react-router";

export default function FourOhFour() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <main className="page-template-404">
          <div className="container">
            <strong className="page-error">404</strong>
            <h1 className="page-title">Sorry, Page Not Found</h1>
            <div className="btn-wrap">
              <Link to="/" className="btn btn-turing-small-yellow">
                <span className="caption">Back to home</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <div className="copyright-login">
        <p className="copyright-login__text">© TURING MACHINES INC.</p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header>
      <nav className="navbar">
        {!token &&
          <>
            <Link className="btn btn-nav" to="/">Register</Link>
            <Link className="btn btn-nav" to="/login">Login</Link>
          </>
        }
        {token && <button onClick={logout}>Logout</button>}
      </nav>
      <h1 className="heading">Simple Customer Relationship Manager</h1>
    </header>
  );
}

export default Header;
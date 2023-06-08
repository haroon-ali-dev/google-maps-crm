import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <header>
      <nav className="navbar">
        {!token &&
          <>
            <Link>Register</Link>
            <Link>Login</Link>
          </>
        }
        {token && <button>Logout</button>}
      </nav>
      <h1 className="heading">Simple Customer Relationship Manager</h1>
    </header>
  );
}

export default Header;
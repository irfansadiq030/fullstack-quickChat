import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiCalls/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// ** Redux Action Imports
import { showLoader, hideLoader } from "../store/loaderSlice";

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch();

  // ** States
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //   ** Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    try {
      dispatch(showLoader());
      response = await loginUser(user);
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message || "Logged in");

        // saving token in localstorage
        localStorage.setItem("token", response?.token);

        window.location.href = "/";
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(hideLoader());
    }
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              autoComplete="true"
              value={user.password}
              onChange={(e) => setUser({ password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Dont have an account yet?
            <Link to="/signup">Signup Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

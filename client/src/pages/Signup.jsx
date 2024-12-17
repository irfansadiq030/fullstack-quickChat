import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../apiCalls/auth";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../store/loaderSlice";

const Signup = () => {
  // ** Hooks
  const dispatch = useDispatch();

  // ** States
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // ** submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    try {
      dispatch(showLoader());
      response = await signupUser(user);
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message || "Success!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something is wrong");
      dispatch(hideLoader());
    }
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="column">
              <input
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
                type="text"
                placeholder="First Name"
              />
              <input
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              autoComplete="true"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <Link to="/login">Login Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

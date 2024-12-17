import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../apiCalls/users";
import { getAllChats } from "../apiCalls/chat";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../store/loaderSlice";
import { setAllUsers, setUser, setAllChats } from "../store/userSlice";

const ProtectedRoute = ({ children }) => {
  // ** States

  // ** Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ** get logged in user details
  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setUser(response?.user));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
      dispatch(hideLoader());
    }
  };

  // ** get all users
  const getAllUsersFromDb = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllUsers();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setAllUsers(response?.users));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
      dispatch(hideLoader());
    }
  };

  // ** get current user Chats
  const getCurrentUserChats = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllChats();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setAllChats(response?.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      navigate("/login");
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // write logic to get the logged in user details
      getLoggedInUser();
      getAllUsersFromDb();
      getCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;

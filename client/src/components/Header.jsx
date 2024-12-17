import React from "react";
import { useSelector } from "react-redux";

// ** Utils Import
import { getInitials } from "../utils/Format";

const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  let fullName = `${user?.firstname} ${user?.lastname}`;
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{fullName}</div>
        <div className="logged-user-profile-pic">{getInitials(fullName)}</div>
      </div>
    </div>
  );
};

export default Header;

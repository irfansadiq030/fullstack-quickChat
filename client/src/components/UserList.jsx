import { useDispatch, useSelector } from "react-redux";
import { getInitials } from "../utils/Format";

import { createNewChat } from "../apiCalls/chat";
import { hideLoader, showLoader } from "../store/loaderSlice";
import toast from "react-hot-toast";
import { setAllChats, setSelectedChat } from "../store/userSlice";

const UserList = ({ searchKey }) => {
  // ** Hooks
  const dispatch = useDispatch();

  const {
    allUsers,
    allChats,
    user: currentUser,
  } = useSelector((state) => state.userReducer);

  // ** Create New chat
  const startNewChat = async (selectedUserId) => {
    const chat =
      allChats.find((chat) => chat.members.includes(currentUser._id)) &&
      chat.members.includes(selectedUserId);

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  // ** Open chat
  const openChat = async (searchedUserId) => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await createNewChat([currentUser?._id, searchedUserId]);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allChats, newChat];
        dispatch(setAllChats(updatedChat));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="user-search-filter">
      {allUsers
        .filter((user) => {
          return (
            user.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
            (user.lastname.toLowerCase().includes(searchKey.toLowerCase()) &&
              searchKey)
          );
        })
        .map((user) => {
          let fullName = `${user.firstname} ${user.lastname}`;
          return (
            <div
              key={user._id}
              className="filtered-user"
              onClick={() => openChat(user._id)}
            >
              <div className="filter-user-display">
                {/* <img src={user.profilePic} alt="Profile Pic" className="user-profile-image" /> */}
                <div className="user-default-profile-pic">
                  {getInitials(fullName)}
                </div>
                <div className="filter-user-details">
                  <div className="user-display-name">{fullName}</div>
                  <div className="user-display-email">{user.email}</div>
                </div>
                {!allChats.find((chat) => chat.members.includes(user._id)) && (
                  <div className="user-start-chat">
                    <button
                      onClick={() => startNewChat(user._id)}
                      className="user-start-chat-btn"
                    >
                      Start Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;

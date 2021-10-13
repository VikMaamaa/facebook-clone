import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./closeFriend.css";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none", color: "inherit" }}
            >
      <img className="sidebarFriendImg" src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  } alt="" />
      <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );
}

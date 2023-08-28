import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";
import { PostList } from "./PostList";
import { Profile } from "./Profile";
import { signOut } from "./slices/authSlice";


export function Usermenu() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();
  

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/");
  };
  const handleSetting = () => {
    navigate("/setting");
  }

   return (
    <div className="usermenu">
      <div className="user-config">
        <Profile />
        <button
            type="button"
            onClick={handleSetting}
            className="navigate-setting-button"
          >
            設定
          </button> 
        {auth && (
          <button
            type="button"
            onClick={handleSignOut}
            className="sign-out-button"
          >
            ログアウト
          </button>                   
        )}
      </div>
      <div style={{width:"100%", height:"30vh", marginLeft:"5%"}}>
      <p>今日も朝からつまらねえ連中が嘘をついているな…</p>
      <h2>よし、俺も嘘でもつくか</h2>
      <Post />
      <PostList />
      <br />
      
      </div>
    </div>
  );
}
export default Usermenu;


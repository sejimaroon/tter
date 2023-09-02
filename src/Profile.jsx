import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import defaultIcon from "./assets/logo192.png";
import { useCookies } from "react-cookie"; 

export function Profile() {
  const isSignedIn = useSelector((state) => state.auth.isSignIn);
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState(""); // ユーザー名を格納するためのステート
  const [cookies] = useCookies(["token"]); // クッキーからユーザー名を取得

  useEffect(() => {
    if (isSignedIn) {
      axios
        .get("/user/icon", { 
        headers: {
          Authorization: `Bearer ${cookies.token}` // トークンをAuthorizationヘッダーに含める
        }
      })
        .then((res) => {
          const userIconUrl = res.data.iconUrl || defaultIcon;
          setIconUrl(userIconUrl);
        })
        .catch((err) => {
          console.log(err);
        });

      const savedName = cookies.name || "";
      setName(savedName);
    }
  }, [isSignedIn, cookies.name, cookies.iconUrl, cookies.token]);

  return (
    <div className="profile">
      <ul className="profile-detail">
        <li>
          <img src={iconUrl} alt="" className="icon" />
        </li>
        <li>
          <span className="username">{name}</span>
        </li>
      </ul>
    </div>
  );
}

export default Profile;

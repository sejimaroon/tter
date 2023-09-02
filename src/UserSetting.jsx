import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";

export function UserSetting() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const icon = useSelector((state) => state.isHaveIcon);
  const [iconUrl, setIconUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);

  const handleNamesetChange = (e) => setName(e.target.value);

  const handleProfileImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    const compressedImage = await new Promise((resolve) => {
      new Compressor(selectedImage, {
        quality: 1,
        width: 100,
        height: 100,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error(err);
          resolve(null);
        },
      });
    });
    if (compressedImage) {
      setProfileImage(compressedImage);
      setPreviewImage(URL.createObjectURL(compressedImage));
    }
  };

  const onSettingChange = async () => {  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", profileImage);
  
    try {
      const response = await axios.put("/setting", formData);
      console.log("Response from /setting:", response.data);
      setCookies("token", response.data.token);
      setIconUrl(response.data.iconUrl);
      setName(response.data.name);
  
      navigate("/menu");
    } catch (err) {
      console.log(err);
      setErrorMessage(`ユーザー情報更新に失敗しました。${err}`);
    }
  };  
  
  useEffect(() => {
    if (cookies.token) {
      axios
        .get("/setting")
        .then((res) => {
          setName(res.data.name);
          setIconUrl(res.data.iconUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cookies.token]);

  return (
    <div className="setting">
      <p className="error-message">{errorMessage}</p>
      <form className="setting-form">
        <ul className="setting-list">
          <li>
            <label htmlFor="profile-image">
              現在のアイコン<br />
              <div className="now-image">
                {icon && <p>現在のアイコン</p>}
                {<img src={iconUrl} alt="" />}
              </div>
              <div className="new-image">
                <p>変更後のアイコン</p>
                {previewImage && <img src={previewImage} alt="" />}
              </div>
              <input
                type="file"
                onChange={handleProfileImageChange}
                className="file-input"
                accept="image/*"
                required
              />
              <br />
            </label>
          </li>
          <li>
            <label htmlFor="setting-name">
              ユーザー名：
              <input
                type="text"
                value={name}
                onChange={handleNamesetChange}
                className="name-input"
                required
                style={{ width: "180px", height: "20px" }}
              />
            </label>
          </li>
          <li>
            <button
              type="button"
              onClick={onSettingChange}
              className="signup-button"
            >
              変更を保存
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default UserSetting;

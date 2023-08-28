import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { signIn } from "./slices/authSlice";

export function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
    };
    axios
      .post("/signup", data)
      .then((res) => {
        const { token } = res.data;
        dispatch(signIn());
        setCookie("token", token);
        setCookie("name", name);
        setCookie("email", email);
        setCookie("password", password);

        navigate("/menu"); 
      })
      .catch((err) => {
        console.error("Failed to sign up:", err);
        navigate("/");
      });
  };

  return (
    <div>
      <h2>アカウント作成</h2>
      <form className="signup-form">
        <ul>
          <li>
            <label htmlFor="signup-address">
              メールアドレス：
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="email-input"
                required
                style={{ width: "180px", height: "20px" }}
              />
            </label>
          </li>
          <li>
            <label htmlFor="signup-name">
              ユーザー名：
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="name-input"
                required
                style={{ width: "180px", height: "20px" }}
              />
            </label>
          </li>
          <li>
            <label htmlFor="signup-password">
              パスワード：
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="password-input"
                required
                style={{ width: "180px", height: "20px" }}
                autoComplete="current-password"
              />
            </label>
          </li>
          <li>
            <button
              type="button"
              onClick={onSignUp}
              className="signup-button"
            >
              アカウント作成
            </button>
          </li>
        </ul>
      </form>
      <Link to="/" style={{ textAlign: "center" }}>
        ホームへ戻る
      </Link>
    </div>
  );
}

export default SignUp;

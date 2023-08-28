import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./slices/authSlice";

export function SignIn ()  {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["cookieName"]);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignIn = () =>  {
    const data = {
      email,
      password
    }
    axios
    .post("/signin", data) // URLを指定
      .then((res) => {
        const { token } = res.data;
        dispatch(signIn());       
        setCookie("token", token);
        navigate("/menu");
      })
      .catch((err) => {
        console.error(`ログインに失敗しました。`);
        navigate("/");
      });
    if (auth) return <navigate to="/" replace />;
    
  };
  
  
  return(
    <div>
      <h2>ログイン</h2>
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
              style={{width:"180px", height:"20px"}}
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
              style={{width:"180px", height:"20px"}}
            />
            </label>
          </li>
          <li>
            <button 
              type="button"
              onClick={onSignIn}
              className="signup-button">
                ログイン
            </button>
          </li>
        </ul>
      </form>
      <Link to="/signup">新規作成</Link>
    </div>
  );
};

export default SignIn;

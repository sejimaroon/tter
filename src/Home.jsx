import React from "react";
import { Link } from "react-router-dom";

export function Home() {
   return (
    <div>
      <ul className="home-menu">
        <li>
          <Link to="/signin">ログイン</Link>
        </li>
        <li>
          <Link to="/signup">アカウント作成</Link>
        </li>
      </ul>
      <p>未ログイン</p>
    </div>
  );
}
export default Home;


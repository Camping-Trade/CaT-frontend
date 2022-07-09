import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import KakaoLogin from "./pages/Login/KakaoLogin";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route path="/login" element={<KakaoLogin />}/>
      </Routes>
  )
}

export default App;

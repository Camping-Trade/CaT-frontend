import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AllCampsite from "./pages/AllCampsite";
import ContentDetail from "./pages/ContentDetail";
import KakaoLoginRedirect from "./pages/Login/KakaoLoginRedirect";

function App() {
  return (
      <Routes>
        {/* Main */}
        <Route exact path="/" element={<Main />}/>

        {/* Login */}
        <Route path="/auth/kakao" element={<KakaoLoginRedirect />} />

        {/* 캠핑장 */}
        <Route path="campsites">
          <Route path="all" element={<AllCampsite />} />
          <Route path=":id" element={<ContentDetail />}/>
        </Route>
      </Routes>
  )
}

export default App;

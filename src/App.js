import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AllCampsite from "./pages/AllCampsite";
import ContentDetail from "./pages/ContentDetail";
import KakaoLoginRedirect from "./pages/Login/KakaoLoginRedirect";
import Reservation from "./pages/Reservation";

function App() {
  return (
      <Routes>

        {/* Main */}
        <Route exact path="/" element={<Main />}/>

        {/* Login */}
        <Route path="/auth/kakao" element={<KakaoLoginRedirect />} />

        {/* Campsites */}
        <Route path="campsites">
          <Route path="all" element={<AllCampsite />} />
          <Route path=":id" element={<ContentDetail />}/>
        </Route>

        {/* Reservation */}
        <Route path="reservation">
          <Route path=":id" element={<Reservation />} />
        </Route>

      </Routes>
  )
}

export default App;

import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AllCampsite from "./pages/AllCampsite";
import ContentDetail from "./pages/ContentDetail";
import MyPage from "./pages/MyPage";

function App() {
  return (
      <Routes>
        {/* Main */}
        <Route exact path="/" element={<Main />}/>

        {/* 캠핑장 */}
        <Route path="campsites">
          <Route path="all" element={<AllCampsite />} />
          <Route path=":id" element={<ContentDetail />}/>
        </Route>

        {/* 마이페이지 */}
        <Route path="mypage" element={<MyPage />} />
      </Routes>
  )
}

export default App;

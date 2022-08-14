import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AllCampsite from "./pages/AllCampsite";
import ContentDetail from "./pages/ContentDetail";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route path="/campsites" element={<AllCampsite />}/>
        <Route path="/campsites/:id" element={<ContentDetail />}/>
      </Routes>
  )
}

export default App;

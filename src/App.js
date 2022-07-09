import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import AllCampsite from "./pages/AllCampsite";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route path="/campsites" element={<AllCampsite />}/>
      </Routes>
  )
}

export default App;

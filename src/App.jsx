import { useState } from "react";
import Login from "./pages/login/login";
import { Route, Routes } from "react-router-dom";
import Guide from "./pages/guide/Guide";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </>
  );
}

export default App;

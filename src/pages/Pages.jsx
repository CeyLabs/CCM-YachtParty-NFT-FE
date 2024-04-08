import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";

function Pages() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
    </Routes>
  );
}

export default Pages;

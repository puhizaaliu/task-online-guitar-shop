import * as React from "react";
import { Routes, Route} from "react-router-dom";
import GuitarBrands from "./pages/GuitarBrands";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuitarBrands />} />
    </Routes>
  );
}
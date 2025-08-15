import * as React from "react";
import { Routes, Route} from "react-router-dom";
import GuitarBrands from "./pages/GuitarBrands";
import GuitarModels from "./pages/GuitarModels";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuitarBrands />} />
      <Route path="/brands/:id/models" element={<GuitarModels />} />
    </Routes>
  );
}
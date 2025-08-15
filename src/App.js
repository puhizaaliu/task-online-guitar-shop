import * as React from "react";
import { Routes, Route} from "react-router-dom";
import GuitarBrands from "./pages/GuitarBrands";
import GuitarModels from "./pages/GuitarModels";
import GuitarDetails from "./pages/GuitarDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuitarBrands />} />
      <Route path="/brands/:id/models" element={<GuitarModels />} />
      <Route path="/brands/:brandId/models/:modelId" element={<GuitarDetails />} />    
    </Routes>
  );
}
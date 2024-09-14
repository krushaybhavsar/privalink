import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import GenerateScreen from "./screens/GenerateScreen/GenerateScreen";
import LandingScreen from "./screens/LandingScreen/LandingScreen/LandingScreen";
import PageNotFound from "./screens/PageNotFound";

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/generate" element={<GenerateScreen />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

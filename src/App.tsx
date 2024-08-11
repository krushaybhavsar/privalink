import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ErrorScreen from "./screens/ErrorScreen";
import LandingScreen from "./screens/LandingScreen";
import GenerateScreen from "./screens/GenerateScreen";

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route
          path="/generate"
          element={<GenerateScreen />}
          errorElement={<ErrorScreen />}
        />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

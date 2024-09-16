import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingScreen from "./screens/LandingScreen/LandingScreen/LandingScreen";
import PageNotFound from "./screens/PageNotFound";
import TransferScreen from "./screens/TransferScreen/TransferScreen";
import { SiteMap } from "./types";

/**
 * UI References
 * https://bird.com/
 * https://ramp.com/
 * https://www.aviato.co/
 * https://www.trustworthy.com/
 * https://proton.me/
 * https://www.loom.com/
 */

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path={SiteMap.LandingScreen.slug} element={<LandingScreen />} />
        <Route
          path={SiteMap.TransferScreen.slug}
          element={<TransferScreen />}
        />
        <Route path={SiteMap.SecurityScreen.slug} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

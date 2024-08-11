import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ErrorScreen from "./screens/ErrorScreen.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorScreen />,
//     children: [
//       {
//         path: "home/",
//         element: <div>home</div>,
//       },
//       {
//         path: "generate/",
//         element: <div>generate</div>,
//       },
//     ],
//   },
// ], {

// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

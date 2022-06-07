import React from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./AppRoutes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./AppRoutes";
import Header from "./Components/Header";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;

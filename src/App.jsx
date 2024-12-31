import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Internal dependencies
import Index from "./routers/Index";
import "./App.css";

function App() {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={4000} transition:Flip />
      <RouterProvider router={Index} />
    </div>
  );
}

export default App;

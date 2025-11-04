import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
      </main>
    </div>
  )
}

export default App

import { Outlet } from "react-router";

import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App

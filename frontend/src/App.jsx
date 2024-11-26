import UserLogin from "./Pages/Logins/Login";
import UserRegister from "./Pages/Register/Register";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/register" element={<UserRegister/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

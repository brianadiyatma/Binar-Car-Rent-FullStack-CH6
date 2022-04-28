import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Cars from "./Pages/Cars/Cars";
import Navigation from "./Components/Nav/Navigation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navigation />}>
          <Route path="" element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

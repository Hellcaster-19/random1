// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ActiveRides from "./pages/activerides";
import RideDetails from "./pages/RideDetails";
import CreateRide from "./pages/CreateRide";
import Chat from "./pages/chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/campaign" element={token ? <Campaign /> : <Navigate to="/login" />} />
        <Route path="/community" element={token ? <Community /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/active" element={token ? <ActiveRides /> : <Navigate to="/login" />} />
        <Route path="/ride/:id" element={token ? <RideDetails /> : <Navigate to="/login" />} />
        <Route path="/create-ride" element={token ? <CreateRide /> : <Navigate to="/login" />} />
        <Route path="/chat/:id" element={token ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
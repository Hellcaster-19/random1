// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import ActiveRides from "./pages/activerides";
import RideDetails from "./pages/RideDetails";
import CreateRide from "./pages/CreateRide";
import Chat from "./pages/chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/active" element={<ActiveRides />} />
        <Route path="/ride/:id" element={<RideDetails />} />
        <Route path="/create-ride" element={<CreateRide />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
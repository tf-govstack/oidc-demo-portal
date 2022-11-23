import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
import SignUpPage from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

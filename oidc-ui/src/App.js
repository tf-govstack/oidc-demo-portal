import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import UserProfilePage from './pages/UserProfile';

function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

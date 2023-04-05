import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  // Link
} from "react-router-dom";
import Home from './pages/Home';
import Header from './components/layout/header/Header';
import Login from './pages/authen/Login';
import SignUp from './pages/authen/SignUp';
import ForgotPassword from './pages/authen/CheckEmail';
import ChangePassword from './pages/authen/ChangePassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header/><Home /></>}></Route>      
          <Route path="/logIn" element={<><Header/><Login /></>}></Route>
          <Route path="/signUp" element={<><Header/><SignUp /></>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
        </Routes>      
      </BrowserRouter>
    </>
  );
}

export default App;

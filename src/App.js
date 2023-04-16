import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  // Link
} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/layout/header/Header';
import Login from './pages/authen/Login';
import SignUp from './pages/authen/SignUp';
import ForgotPassword from './pages/authen/CheckEmail';
import ChangePassword from './pages/authen/ChangePassword';
import UserBook from './pages/book/UserBooks';
import AddBook from './pages/book/AddBook';

function App() {
  useEffect(() => {
    document.title = 'BoSha';
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header/><Home /></>}></Route>      
          <Route path="/logIn" element={<><Header/><Login /></>}></Route>
          <Route path="/signUp" element={<><Header/><SignUp /></>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
          <Route path="/book/userBook" element={<><Header/><UserBook /></>}></Route>
          <Route path="/book/addBook" element={<><Header/><AddBook/></>}></Route>
        </Routes>      
      </BrowserRouter>
    </>
  );
}

export default App;

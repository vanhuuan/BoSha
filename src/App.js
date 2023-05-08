import React from "react";
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
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
import BookDetail from './pages/book/BookDetails';
import PageNotFound from './pages/NotFound';
import EditBook from './pages/book/EditBook';
import Chapter from './pages/chapter/Chapter';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFaild from './pages/payment/PaymentFailed';
import AddChapter from "./pages/chapter/AddChapter";
import { NotificationContainer } from 'react-notifications';
import UpdateChapter from "./pages/chapter/UpdateChapter";
import BuyBook from "./pages/payment/BuyBook";
import 'react-notifications/lib/notifications.css';
import SearchBook from "./pages/book/SearchBook";
import UserInfo from "./pages/user/UserInfo";
import EditUser from "./pages/user/EditUser";
import UserStatistic from "./pages/user/Statistic";

function App() {
  useEffect(() => {
    document.title = 'BoSha';
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header /><Home /></>}></Route>
          <Route path="/logIn" element={<><Header /><Login /></>}></Route>
          <Route path="/signUp" element={<><Header /><SignUp /></>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
          <Route path="/user/userInfo" element={<><Header /><UserInfo /></>}></Route>
          <Route path="/user/userEdit" element={<><Header /><EditUser /></>}></Route>
          <Route path="/user/statistic" element={<><Header /><UserStatistic /></>}></Route>
          <Route path="/book/userBook" element={<><Header /><UserBook /></>}></Route>
          <Route path="/book/userBook" element={<><Header /><UserBook /></>}></Route>
          <Route path="/book/addBook" element={<><Header /><AddBook /></>}></Route>
          <Route path="/book/:id" element={<><Header /><BookDetail /></>}></Route>
          <Route path="/book/edit/:id" element={<><Header /><EditBook /></>}></Route>
          <Route path="/book/search/:isSimple" element={<><Header /><SearchBook/></>}></Route>
          <Route path="/chapter/:id" element={<><Header /><Chapter /></>}></Route>
          <Route path="/chapter/addChapter" element={<><Header /><AddChapter /></>}></Route>
          <Route path="/chapter/updateChapter" element={<><Header /><UpdateChapter /></>}></Route>
          <Route path="/hot" element={<><Header /><Chapter /></>}></Route>
          <Route path="/user/info" element={<><Header /><Chapter /></>}></Route>
          <Route path="/user/favourite" element={<><Header /><Chapter /></>}></Route>
          <Route path="/user/buyBook" element={<><Header /><Chapter /></>}></Route>
          <Route path="/user/payPayPal" element={<><Header /><Chapter /></>}></Route>
          <Route path='/notifySuccess' element={<><Header /><PaymentSuccess /></>}></Route>
          <Route path='/notifyFailed' element={<><Header /><PaymentFaild /></>}></Route>
          <Route path='/BuyBook' element={<><Header /> <BuyBook/></>}></Route>
          <Route path='*' element={<><Header /><PageNotFound /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

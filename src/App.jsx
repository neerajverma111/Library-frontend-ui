import React, { Profiler } from "react";
import Auth from "./Auth/Auth.jsx";
import User from "./UserPanel/User.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin/Admin.jsx";
import MainDashboard from "./UserPanel/MainDashboard.jsx";
import AddBook from "./components/AddBook.jsx";
import WhitelistUsers from "./components/WhitelistUsers.jsx";
import BookList from "./components/BookList.jsx";
import Signup from "./Auth/SignupUser.jsx";
import LoginUser from "./Auth/LoginUser.jsx";
import IssueBook from "./UserPanel/IssueBook.jsx";
import UserBook from "./UserPanel/UserBook.jsx";
import ReturnBook from "./UserPanel/ReturnBook.jsx";
import AllThingsHere from "./components/AllThingsHere.jsx";
import Payfine from "./UserPanel/Payfine.jsx";
import { ProtectedRoute } from "./constants/ProtectedRoute.jsx";
import {
  ADD_BOOK,
  ADMIN,
  ADMIN_DASHBOARD,
  BOOK_LIST,
  ISSUE_BOOK,
  NOT_AUTHORIZED,
  PAY_FINE,
  RETURN_BOOK,
  SIGN_UP,
  USER_DASHBOARD,
  USER_LIST,
} from "./constants/Constant.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path={`${SIGN_UP}`} element={<Signup />} />
        <Route path={`${NOT_AUTHORIZED}`} element={<Auth />} />
        <Route path={`${ADMIN}`} element={<Admin />} />

        <Route element={<MainDashboard />}>
          {/* <Route element={<AdminProtectedRoute />}> */}
          <Route path={`${BOOK_LIST}`} element={<BookList />} />
          <Route path={`${ADD_BOOK}`} element={<AddBook />} />
          <Route path={`${USER_LIST}`} element={<WhitelistUsers />} />
          <Route path={`${ADMIN_DASHBOARD}`} element={<AllThingsHere />} />
          {/* </Route> */}
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<User />}>
            <Route path={`${USER_DASHBOARD}`} element={<UserBook />} />
            <Route path={`${ISSUE_BOOK}`} element={<IssueBook />} />
            <Route path={`${RETURN_BOOK}`} element={<ReturnBook />} />
            <Route path={`${PAY_FINE}`} element={<Payfine />} />
          </Route>
        </Route>

        <Route path={`${ADD_BOOK}`} element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;

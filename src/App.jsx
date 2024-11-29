import React from "react";
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
import { AdminProtectedRoute } from "./constants/AdminProtectedRoute.jsx";
import { ProtectedRoute } from "./constants/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/not-authorized" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />

          <Route element={<MainDashboard />}>
            {/* <Route element={<AdminProtectedRoute />}> */}
              <Route path="/book-list" element={<BookList />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/user-list" element={<WhitelistUsers />} />
              <Route path="/admin-dashboard" element={<AllThingsHere />} />
            {/* </Route> */}
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<User />}>
              <Route path="/user-dashboard" element={<UserBook />} />
              <Route path="/issueBook" element={<IssueBook />} />
              <Route path="/return-book" element={<ReturnBook />} />
              <Route path="/pay-fine" element={<Payfine />} />
            </Route>
          </Route>

          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

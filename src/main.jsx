import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { BookProvider } from "./context/BookContext";
import { LoginUserProvider } from "./context/LoginUser";
// import { IssueBookProvider } from "./context/IssueContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import BookList from "./components/BookList";
// import { UserAuthProvider } from "./context/LoginSignupContext";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      limit={1}
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
    />
    <UserProvider>
      <BookProvider>
        <LoginUserProvider>
          {/* <IssueBookProvider> */}
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          {/* </IssueBookProvider> */}
        </LoginUserProvider>
      </BookProvider>
    </UserProvider>

    {/* <App /> */}
  </>
);

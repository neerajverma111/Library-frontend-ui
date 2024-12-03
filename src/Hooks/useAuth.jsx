const useAuth = () => {
  const auth = localStorage.getItem("token");
  console.log("::::::::", auth);
  if (auth && auth !== "undefined" && auth != "null") {
    return true;
  } else return false;
};

export default useAuth;

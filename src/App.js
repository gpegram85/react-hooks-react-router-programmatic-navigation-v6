import { useState, useEffect} from "react";
import { Outlet, Navigate, useNavigate} from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


   const login = () =>{
    setIsLoggedIn(true);
  };

  const logout = () =>{
    setIsLoggedIn(false);
  };

  useEffect(() =>{
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="app">
{/* Add conditional rendering so users have to be logged in to see pages on the site */}
      {isLoggedIn ? <NavBar logout={logout}  /> : <Navigate to="/login" />}
      <Outlet context={login}/>
    </div>
  );
};

export default App;

// Note: We placed our call to navigate within our useEffect because we want to navigate our user after they've successfully logged in or out. By placing the state that dictates whether or not a user is logged in or out within the dependency array of our useEffect, we can programmatically navigate our user whenever a change in state occurs. This approach means we only call navigate once our state has updated. You don't always have to put navigate inside of a useEffect, but it makes sense to do so in this case.
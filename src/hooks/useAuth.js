import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { auth, facebookProvider, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error,token } = useSelector((state) => state.auth);
 
  // Login
  const login = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      console.log(result);
      localStorage.setItem("token", result.payload.access);
      
      navigate("/");
    }
  };

  // Register
  const register = async (data) => {
    
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      console.log(result.payload);
      navigate("/login");
    }
  };

  // Google OAuth
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      localStorage.setItem("userName", result.user.displayName);
      navigate("/")
      // Optional: send result.user to backend to register/login
    } catch (err) {
      console.error(err.message);
    }
  };

  // Facebook OAuth
  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook User:", result.user);
      // Optional: send result.user to backend to register/login
      localStorage.setItem("userName", result.user.displayName);
      navigate("/")
    } catch (err) {
      console.error(err.message);
    }
  };

  // Logout
  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("FirstName");

    navigate("/login");
  };

  return {
    user,
    loading,
    error,
token,
    login,
    register,
    logoutUser,
    loginWithGoogle,
    loginWithFacebook,
  };
};

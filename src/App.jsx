import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setCurrentUser({ token, user }));
    }
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;

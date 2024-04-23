import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.js";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner.jsx";

const PrivateRoute = () => {
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-Auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;

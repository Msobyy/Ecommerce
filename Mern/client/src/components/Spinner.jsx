import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((previousValue) => previousValue - 1);
    }, 1000);

    // Redirect when count reaches 0
    if (count === 0) {
      clearInterval(interval);
      setTimeout(() => {
        navigate("/login", {
          state: location.pathname,
        });
      }, 1000); // Adjust the delay if needed
    }

    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center ">Redirecting in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;

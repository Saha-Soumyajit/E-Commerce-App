import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner({path = "login"}) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    count === 0 && navigate(`/${path}`, {
      state: location.pathname // Redirect to Dashboard Page, not Home Page
    });
    return () => clearInterval(interval);

  }, [count, navigate, location, path]);

  return (
    <>
      <div className="d-flex align-items-center">
        <strong role="status"><h2>Redirecting to you in {count} second</h2></strong>
        <div className="spinner-border ms-auto" aria-hidden="true" />
      </div>
    </>
  );
}

export default Spinner;

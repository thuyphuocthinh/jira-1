import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { USER_TOKEN } from "../../utils/constants/SystemConstants";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem(USER_TOKEN);
        await axios.post("/Users/TestToken", token);
        setIsAuthenticated(true); // Set isAuthenticated to true only when token validation is successful
      } catch (error) {
        setIsAuthenticated(true); // Set isAuthenticated to false if there's an error validating the token
        console.error("Error validating token:", error);
      }
    };
    checkAuthentication();
  }, []);

  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

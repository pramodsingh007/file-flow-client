/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import Loading from "../components/Loading";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user.isLoaded && !user.isSignedIn) {
      return navigate("/sign-in");
    }
  }, [navigate, user]);
  return (
    <>
      <ClerkLoading>
        <Loading></Loading>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
}

export default PrivateRoute;

import { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const ServerList = lazy(() => import("../../components/ServerList"));

const Root = () => {
  const navigate = useNavigate();
  console.log("Parent component re-rendered");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        replace: true,
      });
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      <ServerList />
    </Suspense>
  );
};

export default Root;

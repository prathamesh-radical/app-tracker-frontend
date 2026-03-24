import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { MyContext } from "../context/Context";
import '../styles/app.css';

const Main = () => {
  const { registerNavigate } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    registerNavigate(navigate);
  }, [navigate, registerNavigate]);
  
  return (
    <div className="main flex flex-col justify-between pt-16 sm:pt-20 md:pt-16 lg:pt-20">
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
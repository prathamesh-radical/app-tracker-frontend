import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import '../styles/app.css';

const Main = () => {
  return (
    <div className="main flex flex-col justify-between pt-16 sm:pt-20 md:pt-16 lg:pt-20">
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
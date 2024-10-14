import { Outlet } from 'react-router-dom';
import Auth from '../../assets/Auth.jpg';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full ">
      <div className="hidden lg:flex items-center justify-center  w-1/2 ">
        <img src={Auth} alt="" className="" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

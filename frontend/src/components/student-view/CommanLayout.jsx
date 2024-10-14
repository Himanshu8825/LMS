import { Outlet } from "react-router-dom";

const StudentCommanLayout = () => {
  return (
    <div>
      Student
      <Outlet />
    </div>
  );
};

export default StudentCommanLayout;

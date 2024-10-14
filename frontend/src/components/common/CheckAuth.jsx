import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();




  // Redirect unauthenticated users to signin page
  if (!isAuthenticated) {
    if (
      !location.pathname.includes('/auth') &&
      !(
        location.pathname.includes('/signin') ||
        location.pathname.includes('/signup')
      )
    ) {
      return <Navigate to="/auth/signin" />;
    }
  }

  // Redirect already authenticated users away from auth routes
  if (
    isAuthenticated &&
    (location.pathname.includes('/signin') ||
      location.pathname.includes('/signup'))
  ) {
    if (user?.role === 'instructor') {
      return <Navigate to="/instructor/dashboard" />;
    } else {
      return <Navigate to="/student/home" />;
    }
  }

  // Instructor route protection
  if (
    isAuthenticated &&
    user?.role !== 'instructor' &&
    location.pathname.includes('/instructor')
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Student route protection
  if (
    isAuthenticated &&
    user?.role !== 'student' &&
    location.pathname.includes('/student')
  ) {
    return <Navigate to="/instructor/dashboard" />;
  }

  // Redirect to specific pages based on role when accessing base "/"
  if (location.pathname === '/') {
    if (isAuthenticated) {
      if (user?.role === 'instructor') {
        return <Navigate to="/instructor/dashboard" />;
      } else {
        return <Navigate to="/student/home" />;
      }
    } else {
      return <Navigate to="/auth/signin" />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;

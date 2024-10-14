import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AddCoursePage,
  AuthLayout,
  CheckAuth,
  CourseDetails,
  CourseProgress,
  Courses,
  InstructorDashboardPage,
  PaymentReturn,
  Signin,
  Signup,
  StudentCommanLayout,
  StudentCourses,
  StudentHome,
} from './Index';
import { checkAuth } from './Store/Slices/AuthSlice';

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    dispatch(checkAuth(token));
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route
          path="/instructor/dashboard"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <InstructorDashboardPage />
            </CheckAuth>
          }
        />

        <Route
          path="/instructor/create-new-course"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AddCoursePage />
            </CheckAuth>
          }
        />

        <Route
          path="/instructor/edit-course"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AddCoursePage />
            </CheckAuth>
          }
        />

        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentCommanLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<StudentHome />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course/details" element={<CourseDetails />} />
          <Route path="student-courses" element={<StudentCourses />} />
          <Route path="course-progress" element={<CourseProgress />} />
          <Route path="payment-return" element={<PaymentReturn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

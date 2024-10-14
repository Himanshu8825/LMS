import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Slices/AuthSlice';
import instructorSlice from './Slices/InstructorSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    instructor: instructorSlice,
  },
});

export default store;

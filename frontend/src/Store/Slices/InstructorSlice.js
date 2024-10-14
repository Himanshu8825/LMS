import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from '@/config';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseLandingFormData: courseLandingInitialFormData,
  courseCurriculumFormData: courseCurriculumInitialFormData,
  mediaUploadProgress: false,
  mediaUploadProgressPercentage: 0,
  instructorCoursesList: [],
  currentEditedCourseId: null,
};

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    setCourseLandingFormData: (state, action) => {
      state.courseLandingFormData = action.payload;
    },
    setCourseCurriculumFormData: (state, action) => {
      state.courseCurriculumFormData = action.payload;
    },
    setMediaUploadProgress: (state, action) => {
      state.mediaUploadProgress = action.payload;
    },
    setMediaUploadProgressPercentage: (state, action) => {
      state.mediaUploadProgressPercentage = action.payload;
    },
    setInstructorCoursesList: (state, action) => {
      state.instructorCoursesList = action.payload;
    },
    setCurrentEditedCourseId: (state, action) => {
      state.currentEditedCourseId = action.payload;
    },
  },
});

export const {
  setCourseLandingFormData,
  setCourseCurriculumFormData,
  setMediaUploadProgress,
  setMediaUploadProgressPercentage,
  setInstructorCoursesList,
  setCurrentEditedCourseId,
} = instructorSlice.actions;

export default instructorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming you use axios for API calls

const initialState = {
  lessons: [],
  quizzes: [],
  loading: false,
  error: null,
};

const lessonAndQuizSlice = createSlice({
  name: "lessonAndQuiz",
  initialState,
  reducers: {
    
    setLessonId(state, action) {
      state.lessons = [action.payload]; 
    },
    setLessons(state, action) {
      state.lessons = action.payload;
    },
    addLesson(state, action) {
      state.lessons.push(action.payload);
    },
    removeLesson(state, action) {
      const index = state.lessons.findIndex(
        (lesson) => lesson._id === action.payload
      );
      state.lessons.splice(index, 1);
    },
    updateLesson(state, action) {
      const updatedLesson = action.payload;
      const index = state.lessons.findIndex(
        (lesson) => lesson._id === updatedLesson.id
      );

      // Update the lesson object at the found index
      state.lessons[index] = updatedLesson;
    },

    // Quiz Actions
    setQuizzes(state, action) {
      state.quizzes = action.payload;
    },
    addQuiz(state, action) {
      state.quizzes.push(action.payload);
    },
    removeQuiz(state, action) {
      const index = state.quizzes.findIndex(
        (quiz) => quiz._id === action.payload
      );
      state.quizzes.splice(index, 1);
    },
    updateQuiz(state, action) {
      const index = state.quizzes.findIndex(
        (quiz) => quiz._id === action.payload.id
      );
      state.quizzes[index] = action.payload;
    },

    // Other Actions (optional)
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },

    // New Actions
    getLessonByIdRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    getLessonByIdSuccess(state, action) {
      state.lessons = [action.payload]; // Assuming response has lesson data
      state.loading = false;
    },
    getLessonByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// **Async Thunks (optional):**
// These thunks can be used to dispatch the above actions based on API calls

export const getLessonById = (lessonId) => async (dispatch) => {
  dispatch(getLessonByIdRequest());
  try {
    const response = await axios.get(`/api/lesson/${lessonId}`);
    dispatch(getLessonByIdSuccess(response.data));
  } catch (error) {
    dispatch(getLessonByIdFailure(error.toString()));
  }
};

export const updateLesson = (updatedLesson) => async (dispatch) => {
  dispatch(setLoading(true)); // Set loading state before API call
  try {
    const response = await axios.put(`/api/lesson/${updatedLesson.id}`, updatedLesson);
    // Assuming successful update on server
    dispatch(updateLesson(response.data)); // Update local state
  } catch (error) {
    dispatch(setError(error.toString())); // Handle errors
  } finally {
    dispatch(setLoading(false)); // Reset loading state after API call
  }
};

export const {
  setLessons,
  setLessonId,
  addLesson,
  removeLesson,
  setQuizzes,
  addQuiz,
  removeQuiz,
  updateQuiz,
  setLoading,
  setError,
  getLessonByIdRequest,
  getLessonByIdSuccess,
  getLessonByIdFailure,
} = lessonAndQuizSlice.actions;
export default lessonAndQuizSlice.reducer;

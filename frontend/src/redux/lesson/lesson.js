import { createSlice } from "@reduxjs/toolkit";

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
    // Lesson Actions
    setLessonId(state, action) {
      const newLesson = action.payload;
      newLesson._id = response.data._id;
      state.lessons = action.payload;
    },
    setLessons(state, action) {
      state.lessons = action.payload;
    },
    addLesson(state, action) {
        const newLesson = action.payload;
        newLesson._id = response.data._id;
      state.lessons.push(action.payload);
    },
    removeLesson(state, action) {
      const index = state.lessons.findIndex(
        (lesson) => lesson._id === action.payload
      );
      state.lessons.splice(index, 1);
    },
    updateLesson(state, action) {
      const index = state.lessons.findIndex(
        (lesson) => lesson._id === action.payload.id
      );
      state.lessons[index] = action.payload;
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
  },
});

export const {
  setLessons,
  setLessonId,
  addLesson,
  removeLesson,
  updateLesson,
  setQuizzes,
  addQuiz,
  removeQuiz,
  updateQuiz,
  setLoading,
  setError,
} = lessonAndQuizSlice.actions;
export default lessonAndQuizSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './Reducer'; // Import the books slice

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;

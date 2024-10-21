import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define a thunk for fetching books from the API using Promise chaining
export const fetchBooks = createAsyncThunk('books/fetchBooks', () => {
  return fetch("https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=lQyXNJWvaLhYeNnALBH47COJv5dn1nfL")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      throw error;
    });
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],           // List of books
    loading: false,      // Loading state
    error: null,         // Error state
    sortCriteria: 'book_title', // Default sorting by Title
    sortOrder: 'asc',    // Default sorting order (ascending)
  },
  reducers: {
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload; // Update sorting criteria
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;    // Update sorting order
    },
    sortBooks: (state) => {
      state.items.sort((a, b) => {
        const fieldA = a[state.sortCriteria] ? a[state.sortCriteria].toLowerCase() : '';
        const fieldB = b[state.sortCriteria] ? b[state.sortCriteria].toLowerCase() : '';
        
        // Sort based on the current order (asc/desc)
        if (state.sortOrder === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;      // Set loading to true when the request starts
        state.error = null;        // Clear any previous errors
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;     // Set loading to false when data is fetched
        state.items = action.payload; // Populate the books in the state
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;     // Set loading to false on error
        state.error = action.error.message; // Set the error message in the state
      });
  },
});

// Export actions for sorting
export const { setSortCriteria, setSortOrder, sortBooks } = booksSlice.actions;

export default booksSlice.reducer;

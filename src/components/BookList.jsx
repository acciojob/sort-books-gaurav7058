import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortCriteria, setSortOrder, sortBooks } from '../Utils/Reducer';
import "../styles/BookList.css";

const BooksList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, sortCriteria, sortOrder } = useSelector((state) => state.books);

  // Fetch books when the component mounts
  useEffect(() => {
    dispatch(fetchBooks()).then(() => {
      dispatch(sortBooks()); // Sort the books by title (default) after fetch
    });
  }, [dispatch]);

  // Handle sorting criteria change
  const handleSortCriteriaChange = (e) => {
    dispatch(setSortCriteria(e.target.value));
    dispatch(sortBooks()); // Sort the books when criteria change
  };

  // Handle sorting order change
  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
    dispatch(sortBooks()); // Sort the books when order changes
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* 1. Render Header */}
      <h1>Books List</h1>

      {/* 2. Render Sort By and Order dropdowns */}
      <div>
        <label htmlFor="criteria">Sort By:</label>
        <select id="criteria" onChange={handleSortCriteriaChange} value={sortCriteria}>
          <option value="book_title">Title</option>
          <option value="book_author">Author</option>
          <option value="byline">Publisher</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select id="order" onChange={handleSortOrderChange} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* 4. Render the table with book data */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {/* 5. Render the book data in sorted order by title (default) */}
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.book_title}</td>
              <td>{item.book_author}</td>
              <td>{item.byline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;

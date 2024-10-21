import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortCriteria, setSortOrder, sortBooks } from '../Utils/Reducer';
import "../styles/BookList.css"
const BooksList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, sortCriteria, sortOrder } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks()); // Fetch books on component mount
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

      <div className="book-container">
        {items.map((item, id) => (
          <div className="book-list" key={id}>
            <h2>{item.book_title}</h2>
            <p><strong>Author:</strong> {item.book_author}</p>
            <p><strong>Publisher:</strong> {item.byline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;

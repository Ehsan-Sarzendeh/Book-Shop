import React from 'react';
import BookCard from '../BookCard/BookCard';
import './BookList.scss';

const BookList = ({ books, addToCart }) => {
  return (
    <div className="container mt-5 category">
      <h2 className="text-right">کتاب ها</h2>
      <div className="row">
        {books.map((book, index) => (
          <BookCard key={index} book={book} addToCart={addToCart} />
        ))}
      </div>
      <div dir="ltr">
        <a href="/all_books" className="btn btn-primary">نمایش کتاب های بیشتر</a>
      </div>
    </div>
  );
};

export default BookList;

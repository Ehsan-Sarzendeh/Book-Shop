import React from 'react';
import './BookCard.scss';

const BookCard = ({ book, addToCart }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <img src={book.image} className="card-img-top" alt={book.title} />
        <div className="card-body">
          <h5 className="card-title text-right">{book.title}</h5>
          <p className="card-text text-right">قیمت: {book.price} تومان</p>
        </div>
        <div dir="ltr" className="card-body">
          <button onClick={() => addToCart(book.title, book.price)} className="btn">خرید</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

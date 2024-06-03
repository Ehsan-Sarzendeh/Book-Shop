import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BookList from '../../components/BookList/BookList';
import CartModal from '../../components/CartModal/CartModal';
import AddToCartModal from '../../components/AddToCartModal/AddToCartModal';
import './HomePage.scss';


const booksData = [
  { title: 'کتاب اول', price: 50000, image: 'images/special-linen-red_1024x1024.jpg' },
  { title: 'کتاب دوم', price: 80000, image: 'images/special-linen-azure_1024x1024.jpg' },
  { title: 'کتاب سوم', price: 40000, image: 'images/ultimate-linen-dark-gray_1024x1024.jpg' },
];

const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addToCartModalIsOpen, setAddToCartModalIsOpen] = useState(false);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

  const addToCart = (title, price) => {
    setCartItems([...cartItems, { title, price }]);
    setAddToCartModalIsOpen(true);
  };

  const removeCartItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const closeAddToCartModal = () => {
    setAddToCartModalIsOpen(false);
  };

  const openCartModal = () => {
    setCartModalIsOpen(true);
  };

  const closeCartModal = () => {
    setCartModalIsOpen(false);
  };

  return (
    <>
      <Header onRequestOpenCart={openCartModal} />

      <div className="parallax">
        <h1>فروشگاه کتاب</h1>
        <h2>خرید و فروش کتاب های نو و دسته دوم</h2>
      </div>
      <BookList books={booksData} addToCart={addToCart} />
      <Footer />

      <AddToCartModal isOpen={addToCartModalIsOpen} onRequestClose={closeAddToCartModal} />
      <CartModal isOpen={cartModalIsOpen} cartItems={cartItems} onRequestClose={closeCartModal} removeCartItem={removeCartItem} />
    </>
  );
};

export default HomePage;

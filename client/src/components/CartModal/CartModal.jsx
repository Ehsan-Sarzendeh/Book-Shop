import React from 'react';
import Modal from 'react-modal';
import './CartModal.scss';

const CartModal = ({ isOpen, cartItems, onRequestClose, removeCartItem }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="سبد خرید"
      className="CartModal"
      overlayClassName="Overlay"
    >
      <div dir="ltr" className="modal-header">
        <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
      </div>
      <h5 className="modal-title">سبد خرید</h5>
      <br/>
      <div className="modal-body">
        <ul className="list-group">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.title}
              <span>{item.price} تومان</span>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeCartItem(index)}>حذف</button>
            </li>
          ))}
        </ul>
        {cartItems.length === 0 && <div className="text-center mt-3">سبد خرید خالی است</div>}
        {cartItems.length > 0 && <div className="text-right mt-3">جمع کل: {totalPrice} تومان</div>}
      </div>
      <br/>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onRequestClose} disabled={cartItems.length === 0}>ادامه خرید</button>
      </div>
    </Modal>
  );
};

export default CartModal;

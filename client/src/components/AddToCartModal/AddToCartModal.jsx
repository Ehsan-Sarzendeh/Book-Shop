import React from 'react';
import Modal from 'react-modal';
import './AddToCartModal.scss';

const AddToCartModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="افزودن به سبد خرید"
      className="AddToCartModal"
      overlayClassName="Overlay"
    >
      <div dir="ltr" className="modal-header">
        <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
      </div>
      <br/>
      <div className="modal-body d-flex justify-content-center">
        کتاب با موفقیت به سبد خرید شما اضافه شد
      </div>
      <br/>
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>بستن</button>
      </div>
    </Modal>
  );
};

export default AddToCartModal;

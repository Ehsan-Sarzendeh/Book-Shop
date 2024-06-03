import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>درباره ما</h5>
            <p>ما یک فروشگاه آنلاین کتاب دسته دوم هستیم که به فروش و ارائه کتاب‌های دست دوم می‌پردازیم.</p>
          </div>
          <div className="col-md-4">
            <h5>تماس با ما</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-phone"></i> ۰۲۱-۲۲۲۲۲۲۲</li>
              <li className='en-font'><i className="fas fa-envelope"></i> info@example.com</li>
              <li><i className="fas fa-map-marker-alt"></i>   تهران، خیابان اصلی، کوچه دوم  </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>لینک‌های مفید</h5>
            <ul className="list-unstyled">
              <li><a href="/">خانه</a></li>
              <li><a href="/manage_books">مدیریت کتاب ها</a></li>
              <li><a href="/all_books">نمایش همه کتاب ها</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row en-font ">
          <div className="col-md-12 text-center">
            <p>© 2024 Book Shop. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Header.scss';

const Header = ({ onRequestOpenCart }) => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">فروشگاه کتاب</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">خانه</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/manage_books">مدیریت کتاب ها</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">درباره ما</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">تماس با ما</a>
              </li>
            </ul>
          </div>
          <div className="row align-items-center">
            <div className="col text-left">
              <img src="https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg"
                alt="Avatar" className="avatar" />
            </div>
          </div>
          <button onClick={onRequestOpenCart} className="btn">سبد خرید</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

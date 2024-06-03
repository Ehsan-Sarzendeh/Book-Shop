import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import './AllBooksPage.scss';

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.w3schools.com/w3js/cd_catalog.js');
        if (!response.ok) throw new Error('Faild to fetch data');
        const data = await response.json();
        setBooks(data.cd);
        setFilteredBooks(data.cd);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('خطا در ارتباط با سرور');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    sortBooks(event.target.value);
  };

  const sortBooks = (sortBy) => {
    let sortedBooks = [...filteredBooks];
    if (sortBy === 'title') {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
      sortedBooks.sort((a, b) => a.price - b.price);
    }
    setFilteredBooks(sortedBooks);
  };

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.artist.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  return (
    <>
      <div className="container mt-2 category">
        <div dir="ltr">
          <a href="/" className="btn">بازگشت</a>
        </div>
        <form action="#" method="get" className="form-inline justify-content-center mt-3">
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="نام کتاب"
            aria-label="Search"
            size="50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            id="searchBtn"
            className="btn btn-outline-light my-2 my-sm-0"
            type="button"
            onClick={handleSearch}
          >
            <i className="fas fa-search"></i> جستجو
          </button>
        </form>
        <h2 className="text-right">کتاب ها</h2>
        <select className="form-select" id="sortOptions" value={sortOption} onChange={handleSortChange}>
          <option value="title">مرتب بر اساس عنوان</option>
          <option value="price">مرتب بر اساس قیمت</option>
        </select>

        <div>
          {
            loading
              ? (<div className="loading">در انتظار دریافت اطلاعات ...</div>)
              : error
                ? (<div className="error-message" >{error}</div>)
                :
                (
                  <div className="en-font" id="bookList">
                    {filteredBooks.map((book, index) => (
                      <div key={index} className="book">
                        <h2>{book.title}</h2>
                        <p>Artist: {book.artist}</p>
                        <p>Price: {book.price}</p>
                      </div>
                    ))}
                  </div>
                )
          }

        </div>

      </div>
      <br />
      <Footer />
    </>
  );
};

export default AllBooksPage;

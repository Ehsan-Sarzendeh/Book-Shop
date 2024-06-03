import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col, Modal, Card } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ManageBooksPage.scss';

function ManageBooksPage() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'نو'
  });
  const [searchData, setSearchData] = useState({
    searchTitle: '',
    searchAuthor: '',
    minPrice: '',
    maxPrice: '',
    filterCondition: ''
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books');
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setError('خطا در دریافت داده‌ها از سرور');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:3000/api/add-book', formData);
      setBooks([...books, response.data]);
      setFormData({
        title: '',
        author: '',
        price: '',
        condition: 'نو'
      });
    } catch (error) {
      setError('خطا در افزودن کتاب');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = Object.keys(searchData)
        .filter(key => searchData[key])
        .map(key => `${key}=${encodeURIComponent(searchData[key])}`)
        .join('&');
      const response = await fetch(`http://localhost:3000/api/books?${query}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError('خطا در جستجو');
    }
  };

  const handleShowModal = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books/${id}`);
      setSelectedBook(response.data);
      setShowModal(true);
    } catch (error) {
      setError('خطا در دریافت اطلاعات کتاب');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <>
      <Header />
      <Container>
        <br />
        <br />
        <br />

        <Card>
          <Card.Body>
            <Card.Title>افزودن کتاب</Card.Title>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>عنوان:</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>نویسنده:</Form.Label>
                <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>قیمت:</Form.Label>
                <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>وضعیت:</Form.Label>
                <Form.Control as="select" name="condition" value={formData.condition} onChange={handleChange} required>
                  <option>نو</option>
                  <option>تقریبا نو</option>
                  <option>دسته دوم</option>
                </Form.Control>
              </Form.Group>
              <div dir='ltr'>
                <Button type="submit">افزودن کتاب</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <br />

        <Card>
          <Card.Body>
            <Card.Title>جستجو و فیلتر </Card.Title>
            <br />
            <Form onSubmit={handleSearch}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>عنوان:</Form.Label>
                    <Form.Control type="text" name="searchTitle" value={searchData.searchTitle} onChange={handleSearchChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>نویسنده:</Form.Label>
                    <Form.Control type="text" name="searchAuthor" value={searchData.searchAuthor} onChange={handleSearchChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>حداقل قیمت:</Form.Label>
                    <Form.Control type="number" name="minPrice" value={searchData.minPrice} onChange={handleSearchChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>حداکثر قیمت:</Form.Label>
                    <Form.Control type="number" name="maxPrice" value={searchData.maxPrice} onChange={handleSearchChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>وضعیت:</Form.Label>
                    <Form.Control as="select" name="filterCondition" value={searchData.filterCondition} onChange={handleSearchChange}>
                      <option value="">همه</option>
                      <option>نو</option>
                      <option>تقریبا نو</option>
                      <option>دسته دوم</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <div dir='ltr' className="mt-4">
                    <Button type="submit">جستجو</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <br />

        <Card>
          <Card.Body>
            <Card.Title>لیست کتاب ها</Card.Title>
            <br />
            {loading ? (
              <p className="loading">در انتظار دریافت اطلاعات ...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : books.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>عنوان</th>
                    <th>نویسنده</th>
                    <th>قیمت</th>
                    <th>وضعیت</th>
                    <th>جزئیات</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.price}</td>
                      <td>{book.condition}</td>
                      <td>
                        <svg onClick={() => handleShowModal(book._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="action bi bi-info-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"></path>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="error-message">کتابی یافت نشد</p>
            )}
          </Card.Body>
        </Card>

        <br />

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>جزئیات کتاب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBook ? (
              <div>
                <p><strong>عنوان:</strong> {selectedBook.title}</p>
                <p><strong>نویسنده:</strong> {selectedBook.author}</p>
                <p><strong>قیمت:</strong> {selectedBook.price}</p>
                <p><strong>وضعیت:</strong> {selectedBook.condition}</p>
              </div>
            ) : (
              <p className="loading">در انتظار دریافت اطلاعات ...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              بستن
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>

      <Footer />
    </>
  );
}

export default ManageBooksPage;

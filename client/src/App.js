import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AllBooksPage from './pages/AllBooksPage/AllBooksPage';
import ManageBooksPage from './pages/ManageBooksPage/ManageBooksPage';
import './App.scss';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all_books" element={<AllBooksPage />} />
          <Route path="/manage_books" element={<ManageBooksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

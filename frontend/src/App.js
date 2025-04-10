import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/shorten', {
        originalUrl: longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">MyShorty</a>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 p-4 bg-white rounded shadow">
          <h1 className="text-center mb-4 fw-bold text-primary">Shorten your link ✂️</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Paste your long URL here"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Shorten URL
            </button>
          </form>

          {shortUrl && (
            <div className="alert alert-success mt-4 text-center">
              <strong>Your short link:</strong><br />
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted py-3 small">
        Made with ❤️ for AIP Project
      </footer>
    </>
  );
}

export default App;

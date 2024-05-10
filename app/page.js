'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    loadCategory();
    loadAllBooks();
  }, []);

  const loadCategory = () => {
    fetch("https://library-system-f65w.onrender.com/categories/")
      .then((res) => res.json())
      .then((data) => {
        const buttonsHTML = data.map((item) => (
          <button key={item.id} className="btn btn-outline-secondary mx-2 my-1" onClick={() => loadAllBooks(item.id, item.name)}>
            {item.name}
          </button>
        ));

        setCategoryName('');
        setBooksData([]);
      });
  };

  const loadAllBooks = (categoryId, categoryName) => {
    let url = "https://library-system-f65w.onrender.com/books/";
    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
        setCategoryName(categoryName || 'All Books');
      });
  };

  const displayBooks = () => {
    if (booksData.length === 0) {
      return <p>{categoryName} books are not available at the moment.</p>;
    }

    return booksData.map((book) => (
      <div key={book.id} className="book-card col-md-4 mb-4">
        <div className="h-100">
          <Image src={book.image?book.image:'no image found'} className="card-img-top" alt="" width={300} height={400} />
          <div className="card-body">
            <h5 className="card-title text-center mb-2"><small>{book.title}</small></h5>
            <small className="card-text">Category: {book.genre_name}</small><br />
            <small className="card-text">Author: {book.author}</small><br />
            <small className="card-text">ISBN: {book.ISBN}</small><br />
            <small className="card-text">Publication Date: {book.publication_date}</small><br />
            <small className="card-text"><strong>Status:</strong> {book.availability_status ? "Available" : "Not Available"}</small><br />
            <small className="card-text"><strong>No. of Books:</strong> {book.quantity}</small><br />
          </div>
          <div className="flex justify-content-center align-items-center">
            <a href={`book_details.html?id=${book.id}`} className="text-center mt-5 btn btn-primary">Book Details</a>
          </div>
        </div>
      </div>
    ));
  };

  const handleSearch = () => {
    const filteredBooks = filterBooksByTitle(searchQuery);
    setBooksData(filteredBooks);
    setCategoryName('Search Results');
  };

  const filterBooksByTitle = (title) =>
    booksData.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input type="text" id="search" onChange={(e) => setSearchQuery(e.target.value)} />
      <button id="searchBtn" onClick={handleSearch}>Search</button>
      <div id="category-container"></div>
      <div className="row" id="books">
        {displayBooks()}
      </div>
    </main>
  );
}

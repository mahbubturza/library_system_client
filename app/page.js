'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    setLoading(true);
    fetch("https://library-system-f65w.onrender.com/categories/")
      .then((res) => res.json())
      .then((data) => {
        setBooksData([]);
        setCategoryName('');
        loadAllBooks();
      })
      .catch(error => {
        console.error('Error loading categories:', error);
        setLoading(false); 
      });
  };

  const loadAllBooks = (categoryId) => {
    let url = "https://library-system-f65w.onrender.com/books/";
    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
        setCategoryName(categoryName || 'All Books');
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error loading books:', error);
        setLoading(false);
      });
  };

  const displayBooks = () => {
    if (loading) {
      return <p>Loading...</p>; 
    }

    if (booksData.length === 0) {
      return <p>{categoryName} books are not available at the moment.</p>;
    }

    return booksData.map((book) => (
      <div key={book.id} className="book-card col-md-4 mb-4">
        <div className="h-100">
          {book.image ? (
            <Image src={book.image} className="card-img-top" alt="" width={300} height={400} />
          ) : (
            <p>No image found</p>
          )}
          <div className="card-body">
            {/* Book details */}
          </div>
        </div>
      </div>
    ));
  };

  const handleSearch = () => {
    // Implement debounce for search functionality
    // to reduce unnecessary fetch requests
    // Set a timer to execute search after a certain delay
  };

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

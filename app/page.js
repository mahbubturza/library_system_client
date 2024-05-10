"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://library-system-f65w.onrender.com/categories/`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryName(data);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://library-system-f65w.onrender.com/books/`)
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
        setLoading(false);
      });
  }, []);

  const filterBooksByCategory = (categoryId) => {
    if (categoryId === null) {
      // If no category is selected, load all books
      setLoading(true);
      fetch(`https://library-system-f65w.onrender.com/books/`)
        .then((res) => res.json())
        .then((data) => {
          setBooksData(data);
          setLoading(false);
        });
    } else {
      // Filter books by category
      setLoading(true);
      fetch(`https://library-system-f65w.onrender.com/books/?category=${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setBooksData(data);
          setLoading(false);
        });
    }
  };

  const filterBooksBySearch = () => {
    const filteredBooks = booksData.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBooksData(filteredBooks);
  };

  console.log(booksData);

  const displayBooks = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (booksData.length === 0) {
      return <p>{categoryName.length > 0 ? categoryName[0].name : ''} books are not available at the moment.</p>;
    }

    return booksData.map((book) => (
      <div key={book.id} className="book-card col-md-4 mb-4">
        <div className="h-100">
          {book.image ? (
            <Image
              src={book.image}
              className="card-img-top"
              alt=""
              width={300}
              height={400}
            />
          ) : (
            <p>No image found</p>
          )}
          <div className="card-body">
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.publication_date}</p>
          </div>
        </div>
      </div>
    ));
  };

  const displayCategories = () => {
    return (
      <div>
        <h2>Categories</h2>
        <div>
          <button onClick={() => filterBooksByCategory(null)}>All Books</button>
          {categoryName.map((category) => (
            <button key={category.id} onClick={() => filterBooksByCategory(category.id)}>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSearch = () => {
    filterBooksBySearch();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id="searchBtn" onClick={handleSearch}>
        Search
      </button>
      <div id="category-container">
        {displayCategories()}
      </div>
      <div className="row" id="books">
        {displayBooks()}
      </div>
    </main>
  );
}

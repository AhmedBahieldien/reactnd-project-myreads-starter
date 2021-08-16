import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


import Shelfs from "./myshelf";

const BooksList = (props) => {
  const { books, changeShelf } = props;

  const shelfTypes = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want to Read" },
    { type: "read", title: "Read" },
  ];

  BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };



//wrapped a button inside the link to show the css  

//shelf Component added

  return (
    <div className="list-books-content">
      {shelfTypes.map((shelf, index) => {
        const bookshelf = books.filter((book) => book.shelf === shelf.type);
        return (
          <div key={index}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            
            <Shelfs books={bookshelf} changeShelf={changeShelf} />
          </div>
        );
      })}
  
      <div className="open-search">
        <Link to="/search">
          <button type='button'>search</button>
          </Link>
      </div>
    </div>
  );
};

export default BooksList;

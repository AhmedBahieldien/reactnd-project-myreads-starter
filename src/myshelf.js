import React, { Component } from "react";
import PropTypes from "prop-types";

import ChooseShelf from "./ChooseShelf";

class Shelfs extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, changeShelf } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <div className="book" key={book.id}>
              <li key={book.id}>
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  />
                  <ChooseShelf books={books} Book={book} changeShelf={changeShelf} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

export default Shelfs;

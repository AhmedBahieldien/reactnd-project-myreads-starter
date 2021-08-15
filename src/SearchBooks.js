import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ChooseShelf from "./ChooseShelf";

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    const { books, changeShelf } = this.props;
    const { query } = this.state;
  
    const searchedbooks =
      query === ""
        ? []
        : books.filter(
            (B) =>
              B.title.toLowerCase().includes(query.toLowerCase()) ||
              B.authors.find(a => a.toLowerCase().includes(query.toLowerCase()))

          );
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="search-books-results">
          {searchedbooks.length !== 0 && (
            <ol className="books-grid">
              {searchedbooks.map((book) => (
                <li key={book.title}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    />

                    <ChooseShelf Book={book} changeShelf={changeShelf} />
                  </div>

                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";



import ChooseShelf from "./ChooseShelf";

class SearchBooks extends Component {

  static propTypes = {
    books : PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  state = {
    query: "",
    newbooks: [],
    };

  

  searchquery = event => {
    const query = event.target.value;
    this.setState({ query });
    if(query){
  
      BooksAPI.search(query.trim(),20).then(books => {
        books.length > 0
          ? this.setState({ newbooks: books })
          : this.setState({ newbooks: [] });
      });
  
    }
    else  this.setState({ newbooks: []});

    console.log(this.state.newbooks.length)
  };  


/*
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
    if(query){
      BooksAPI.search(query.trim(), 20).then(foundbooks => {
        foundbooks.length > 0
        ? this.setState({ newbooks: foundbooks ,found:true })
        : this.setState({ newbooks: [] ,found:false});
      });
  
    }
    else  this.setState({ newbooks: [] ,found:false});
  };  
*/
  render() {
    const {   books,changeShelf } = this.props;
    const { query, newbooks} = this.state;
  /*
    const searchedbooks =
      query === ""
        ? []
        : books.filter(
            (B) =>
              B.title.toLowerCase().includes(query.toLowerCase()) ||
              B.authors.find(a => a.toLowerCase().includes(query.toLowerCase()))

          );

              
          const searchedbooks =
      query === ""
        ? []
        :   BooksAPI.search(query.trim(), 20).then(foundbooks => {
          foundbooks.length > 0
          ? this.setState({ books: foundbooks })
          : this.setState({ books: [] });
        });
    */
 

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
                onChange={this.searchquery}
              />
            </div>
          </div>
        </div>

        <div className="search-books-results">
          {newbooks.length>0 && (
            <ol className="books-grid" >
              {newbooks.map(book=> (
                   (book.imageLinks && book.imageLinks.thumbnail) && (
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
              )))}
            </ol>
          )}

          

        </div>
      </div>
    );
  }
}

export default SearchBooks;

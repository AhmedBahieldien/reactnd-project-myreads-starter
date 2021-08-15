import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import { Link, Route, Switch } from "react-router-dom";

import BooksList from "./BooksList";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  state = {
    Books: [],
  };

  //get all the data using the api
  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        Books: books,
      })
    );
  }

  changeShelf = (Book, newshelf) => {
    BooksAPI.update(Book, newshelf).then(res => {
      Book.shelf = newshelf;
      this.setState(prevState => ({
        Books: prevState.Books.filter(book => book.id !== Book.id).concat(Book)
      }));
    });
  };

  

  render() {
    const { Books } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BooksList books={Books}  changeShelf={this.changeShelf}/>
              </div>
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <div className="search-books-results">
                <SearchBooks books={Books} changeShelf={this.changeShelf} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default BooksApp;

{
  /*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */
}

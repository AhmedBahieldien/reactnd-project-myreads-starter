import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Route, Switch } from "react-router-dom";

import BooksList from "./BooksList";

class ChooseShelf extends Component {
  
  static propTypes = {
    Book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    this.props.changeShelf(this.props.Book, e.target.value);
  };

  render() {
    const { Book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={Book.shelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default ChooseShelf;

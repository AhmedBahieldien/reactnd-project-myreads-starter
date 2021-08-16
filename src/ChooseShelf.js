import React, { Component } from "react";
import PropTypes from "prop-types";



class ChooseShelf extends Component {
  
  static propTypes = {
    books : PropTypes.array.isRequired,
    Book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    this.props.changeShelf(this.props.Book, e.target.value);
  };



  render() {
    const { books,Book } = this.props;

    let currentshelf = 'none';

    for (let item of books) {
      if (item.id === Book.id) {
        currentshelf = item.shelf;
        break;
      }
    }

    return (
    
      <div className="book-shelf-changer">
          {(Book.shelf==='currentlyReading' ||Book.shelf==='wantToRead'  || Book.shelf==='read')
          ? (
        <select value={Book.shelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
          ):
           <select value={currentshelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>}
      </div>
    );
  }
}
export default ChooseShelf;

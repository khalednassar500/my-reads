import React, { Component } from 'react';
import { search } from './BooksAPI';
import CreateBook from './CreateBook';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    query: '',
    searchItems: []
  }

  wellShearch = (queryResault) => {
    const myBooks = [...this.props.myBooks];
    const myBooksId = myBooks.map((book) => {
      return book.id
    })
    for (let x = 0; x <= queryResault.length-1; x++) {
      if (myBooksId.indexOf(queryResault[x].id) >= 0) {
        queryResault[x].shelf = myBooks[myBooksId.indexOf(queryResault[x].id)].shelf
      }
    }
    return queryResault;
  }

  updateQuery = (value) => {
    this.setState(() => ({
      query: value.trim()
    }))
    
    if (value) {
        search(value).then((books) => {        

        books = books.error ? books.items: books;
        books = books && [...this.wellShearch(books)];

        this.setState(() => ({
          searchItems: books
        }))
      })
    }else {
      this.setState(() => ({
        searchItems: []
      }))
    }
  }



  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/my-reads' className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchItems !== [] && this.state.searchItems.map(book => {
              return (
                <CreateBook 
                  book={book} 
                  key={book.id}
                  onUpdate={(book, newShelf) => this.props.onUpdate(book, newShelf)}
                />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
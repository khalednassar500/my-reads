import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: 0,
    myBooks: [],
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
  }

  componentDidMount() {
    let currentlyReading = []
    let wantToRead = []
    let read = []

    BooksAPI.getAll()
      .then((books) => {

        for (let book of books) {    
          // eslint-disable-next-line default-case
          switch (book.shelf) {
            case 'currentlyReading':
              currentlyReading.push(book)
              break;
            case 'wantToRead':
              wantToRead.push(book)
              break;
            case 'read':
              read.push(book)
              break;
          }
        }
        this.setState(() => ({
          currentlyReadingList: [...currentlyReading],
          wantToReadList: [...wantToRead],
          readList: [...read],
          myBooks: books
        }))
      }).catch((error) =>console.log(error))
    }

    updateBooks = (book, newShelf) => { 

      let prevShelf = book.shelf;
      if (prevShelf === newShelf || (prevShelf === undefined && newShelf === 'none')) return;

      BooksAPI.update(book, newShelf)

      const addBook = () => {
        let nS = newShelf + 'List';
        this.setState((prevState) => ({
          [nS]: [...prevState[nS], book]
        }))
      }
      const removeBook = () => {
        let pS = prevShelf + 'List';
        this.setState((prevState) => ({
          [pS]: prevState[pS].filter((i) => {
            return i.id !== book.id
          }),
        }))
      }

      if (newShelf === 'none') {
        delete book.shelf;
        removeBook();
        return;
      }

      book.shelf = newShelf;

      if (prevShelf) removeBook();
      addBook();
    }

  render() {
    return (
      <div className="app">
        <Routes>
                 <Route exact path='/my-reads' element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading 
                  currentlyReadingList={this.state.currentlyReadingList}
                  onUpdate={(book, newShelf) => this.updateBooks(book, newShelf)}
              />
                <WantToRead 
                  wantToReadList={this.state.wantToReadList} 
                  onUpdate={(book, newShelf) => this.updateBooks(book, newShelf)}
                />
                <Read 
                  readList={this.state.readList} 
                  onUpdate={(book, newShelf) => this.updateBooks(book, newShelf)}
                />
              </div>
            </div>
            <div className="open-search">
              <Link  to='/find-books' >Open shearch</Link>
            </div>
          </div>
        } />  
        </Routes>

        <Routes> 
          
          <Route path="/find-books" element={ <SearchBooks 
            myBooks={this.state.myBooks}
            onUpdate={(book, newShelf) => this.updateBooks(book, newShelf)}
          />
        } ></Route>
        </Routes>
      </div>
    )
  }
}

export default BooksApp

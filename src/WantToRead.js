import React from 'react';
import CreateBook from './CreateBook';

const WantToRead = (props) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      {props.wantToReadList.length >= 1 && 
        <div className="bookshelf-books">
        <ol className="books-grid">
          {props.wantToReadList.map((book) => {
            return (
              <CreateBook 
                book={book} 
                key={book.id}
                onUpdate={(book, newShelf) => props.onUpdate(book, newShelf)}
              />
            )
          })}
        </ol>
      </div>}
    </div>
  )
}

export default WantToRead;
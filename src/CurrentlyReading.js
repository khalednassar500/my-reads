import React from 'react';
import CreateBook from './CreateBook';

const CurrentlyReading = (props) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Current Reading</h2>
      {props.currentlyReadingList.length >= 1 && 
        <div className="bookshelf-books">
        <ol className="books-grid">
          {props.currentlyReadingList.map((book) => {
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

export default CurrentlyReading;
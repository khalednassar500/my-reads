import React from 'react';
import CreateBook from './CreateBook';

const Read = (props) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      {props.readList.length >= 1 && 
        <div className="bookshelf-books">
        <ol className="books-grid">
          {props.readList.map((book) => {
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

export default Read;
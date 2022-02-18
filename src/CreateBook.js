import React from "react";
import initialImg from './icons/init-img.png';

const CreateBook = (props) => {
  const { book, onUpdate } = props;
  const img = book.hasOwnProperty('imageLinks') ? book.imageLinks.thumbnail : initialImg;
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
               style={{ width: 128,
                        height: 193,
                        backgroundImage: `url("${img}")` }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => onUpdate(book, e.target.value)} defaultValue={!book.shelf ? 'none': book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option 
                value="currentlyReading" 
                className={book.shelf ==='currentlyReading'? 'on' : 'off'}
              > Currently Reading</option>
              <option 
                value="wantToRead" 
                className={book.shelf ==='wantToRead'? 'on' : 'off'}
              > Want to Read</option>
              <option 
                value="read" 
                className={book.shelf ==='read'? 'on' : 'off'}
              > Read</option>
              <option 
                value="none" 
                className={book.shelf? 'off' : 'on'}
              > None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  )
}
export default CreateBook;
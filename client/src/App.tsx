import { useEffect, useState } from 'react'
import './App.css'
import { Book, BookState, getBooks } from './api'
import { BookComponent } from './Book'
import { BookShelfComponent } from './BookShelf'

function App() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function loadBooks() {
      const bs = await getBooks();  
      setBooks(bs);  
    }
    loadBooks(); 
  }, []);

  
  return(
    <>
    <h1>Book Shelf</h1>
    {books.length > 0 ? (
      <section data-testid="book-container">
        <BookShelfComponent books={books} />
      </section>
    ) : (
      <em>No books available</em>
    )}
  </>
);
}
export default App

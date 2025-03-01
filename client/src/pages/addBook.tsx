import '../styles/form.css';
import { addBook, Book } from '../api';
import BookForm from '../components/BookForm';

function AddBook() {
  const handleAddBook = async (book: Book) => {
    await addBook(
      book.title, 
      book.author, 
      book.state, 
      book.rating ?? undefined, 
      book.comment
    );
  };

  return <BookForm onSubmit={handleAddBook} />;
}

export default AddBook;

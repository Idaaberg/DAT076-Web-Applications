import '../styles/form.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, editBook, getBookById } from '../api';
import BookForm from '../components/BookForm';
import { useNavigate } from "react-router-dom";

/**
 * Defines the EditBook page
 * @returns EditBook page
 */
function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      if (id) {
        const fetchedBook = await getBookById(id);
        setBook(fetchedBook);
      }
    }
    fetchBook();
  }, [id]);

  const navigate = useNavigate();

  const handleEditBook = async (updatedBook: Book) => {
    if (!updatedBook.id) return;
    await editBook(
        updatedBook.id,
        updatedBook.title, 
        updatedBook.author, 
        updatedBook.state, 
        updatedBook.rating ?? undefined, 
        updatedBook.comment
    );
  };

  if (!book) return <div>Loading...</div>;

  return (<BookForm initialBook={book} onSubmit={handleEditBook} isEditing />);
}

export default EditBook;

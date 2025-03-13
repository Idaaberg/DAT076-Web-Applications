import { useState } from "react";
import { RatingComponent } from "./Rating";
import { Book, BookState } from "../api";
import { useNavigate } from "react-router-dom";
import { DeletePopup } from "./DeletePopup";
import Header from "./Header";


interface BookFormProps {
  initialBook?: Book;
  onSubmit: (book: Book) => Promise<void>;
  isEditing?: boolean;
}

/**
 * Defines the BookForm component
 * @param initialBook - the initial book
 * @param onSubmit - the function to submit the book
 * @param isEditing - the boolean to check if in editing mode
 * @returns BookForm component
 */
const BookForm: React.FC<BookFormProps> = ({ initialBook, onSubmit, isEditing = false }) => {
  const [book, setBook] = useState<Book>(
    initialBook || {
      id: 0, // Used only in edit mode
      title: "",
      author: "",
      state: BookState.HaveRead,
      rating: undefined,
      comment: "",
    }
  );

  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(book);
      navigate("/home");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleHeaderClick = () => {
    navigate("/home");
}

  return (
    <>
      <header>
        <h3 className="headerText" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
          BookShelf
        </h3>
        <Header/>
        <h2 className="addBookHeader">{isEditing ? "Edit Book" : "Add Book"}</h2>
      </header>
      <main className="addBookMain">
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Author</label>
            <input
              type="text"
              placeholder="Author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Select Status</label>
            <select
              value={book.state}
              onChange={(e) => setBook({ ...book, state: e.target.value as BookState })}
              required
            >
              <option value={BookState.HaveRead}>Finished Reading</option>
              <option value={BookState.Reading}>Currently Reading</option>
              <option value={BookState.WantToRead}>Want to Read</option>
            </select>
          </div>

          <div>
            <label>Rating</label>
            <div className="ratingContainer">
              <RatingComponent
                value={book.rating ?? null}
                onChange={(newValue) => setBook({ ...book, rating: newValue ?? undefined })}
              />
            </div>
          </div>

          <div>
            <label>Comments</label>
            <textarea
              placeholder="Add your comments about the book"
              value={book.comment}
              onChange={(e) => setBook({ ...book, comment: e.target.value })}
            ></textarea>
          </div>

          <div className="buttonGroup">
            {isEditing ? (
              <button className="submitBtn" type="submit" onClick={() => localStorage.setItem("editSuccess", "true")}>Save Changes</button>

            ) : (
              <button className="submitBtn" type="submit" onClick={() => localStorage.setItem("bookAdded", "true")}>Submit</button>
            )}
            {isEditing ?
              <button className="deleteBtn" type="button" onClick={() => setPopupOpen(true)}>Delete</button>
              :
              <a className="cancelBtn" href="/home">
                <button className="cancelBtn" type="button" onClick={() => localStorage.removeItem("bookAdded")}>Cancel</button>
              </a>
            }
          </div>
        </form>
        {popupOpen && (
          <DeletePopup bookId={book.id} setPopupOpen={setPopupOpen} />
        )}
      </main>
    </>
  );
};

export default BookForm;

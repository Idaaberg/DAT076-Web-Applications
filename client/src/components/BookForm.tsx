import { useState } from "react";
import { RatingComponent } from "./Rating";
import HomeIcon from "@mui/icons-material/Home";
import { Book, BookState } from "../api";
import { useNavigate } from "react-router-dom";

interface BookFormProps {
  initialBook?: Book;
  onSubmit: (book: Book) => Promise<void>;
  isEditing?: boolean;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(book);
      navigate("/home");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <>
      <header>
        <a href="/home">
          <HomeIcon className="homeIcon" sx={{ color: "#ff69b4" }} fontSize="large" />
        </a>
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
            <button className="submitBtn" type="submit">
              {isEditing ? "Save Changes" : "Submit"}
            </button>
            <a href="/home">
              <button className="cancelBtn" type="button">
                Cancel
              </button>
            </a>
          </div>
        </form>
      </main>
    </>
  );
};

export default BookForm;

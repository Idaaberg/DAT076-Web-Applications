import '../styles/Form.css';
import { RatingComponent } from '../components/Rating';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { addBook, BookState } from '../api';
import { useState } from 'react';

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [state, setState] = useState<BookState>(BookState.HaveRead);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook(title, author, state, rating ?? undefined, comment);
      navigate("/"); 
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <>
      <header>
        <Link to="/">
          <HomeIcon className="homeIcon" sx={{ color: '#ff69b4' }} fontSize="large"/>
        </Link>
        <h2 className="addBookHeader">Add Book</h2>
      </header>
      <main className="addBookMain">
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Author</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Select Status</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value as BookState)}
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
              <RatingComponent value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <label>Comments</label>
            <textarea
              placeholder="Add your comments about the book"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="buttonGroup">
            <button className="submitBtn" type="submit">
              Submit
            </button>
            <Link to="/">
              <button className="cancelBtn" type="button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default AddBook;

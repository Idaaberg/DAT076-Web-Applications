import '../styles/form.css';
import { RatingComponent } from '../components/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Book, BookState, editBook, getBookById } from '../api';
import { useEffect, useState } from 'react';

function EditBook() {
    const { id } = useParams(); 
    const [book, setBook] = useState<Book | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBook() {
            if (id) {
                const fetchedBook = await getBookById(id);
                console.log("use effect editbook i if fetchedBook", fetchedBook);
                setBook(fetchedBook);
            }
        }
        fetchBook();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await editBook(book.id, book.title, book.author, book.state, book.rating ?? undefined, book.comment);
            navigate("/home");
        } catch (error) {
            console.error("Error editing book:", error);
        }
    };

    return (
        <>
            <header>
                <a href="/home">
                    <HomeIcon className="homeIcon" sx={{ color: '#ff69b4' }} fontSize="large"/>
                </a>
                <h2 className="addBookHeader">Edit Book</h2>
            </header>
            <main className="addBookMain">
                <form className="form-group" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={book.title}
                            onChange={(e) => setBook({ ...book, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label>Author</label>
                        <input
                            type="text"
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
                            value={book.comment}
                            onChange={(e) => setBook({ ...book, comment: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="buttonGroup">
                        <button className="submitBtn" type="submit">
                            Save changes
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
}

export default EditBook;

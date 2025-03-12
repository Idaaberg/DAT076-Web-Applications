import { useEffect, useState } from "react";
import { NavbarComponent } from "../components/NavBar";
import { Book, getBooks } from "../api";
import { BookShelfComponent } from "../components/BookShelf";
import "../App.css";
import SuccessPopup from "../components/SuccessPopup";


/**
 * Defines the Home page
 * @returns Home page
 */
function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [filterBy, setFilterBy] = useState<"title" | "author" | "state" | "rating">("title");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadBooks() {
            const bs = await getBooks();
            setBooks(bs);
            setFilteredBooks(bs);
        }
        loadBooks();
    }, []);

    useEffect(() => {
        if (localStorage.getItem("editSuccess")) {
          setShowPopup(true);
          setMessage("Your changes have been saved!");
          localStorage.removeItem("editSuccess");
        } else if (localStorage.getItem("bookAdded")) {
            setShowPopup(true);
            setMessage("Your book has been added!");
            localStorage.removeItem("bookAdded");
        } else if (localStorage.getItem("bookDeleted")) {
            setShowPopup(true);
            setMessage("Your book has been deleted!");
            localStorage.removeItem("bookDeleted");
        }
      }, [])
    
    useEffect(() => {
        let updatedBooks = books.filter((book) =>
            book[filterBy]?.toString().toLowerCase().includes(search.toLowerCase())
        );

        setFilteredBooks(updatedBooks);
    }, [search, filterBy, books]);

    return (
        <>
            <div className="home">
                <NavbarComponent 
                    search={search} 
                    setSearch={setSearch} 
                    setFilterBy={setFilterBy} 
                />
                
                {showPopup && <SuccessPopup message={message} onClose={() => setShowPopup(false)} />}
                {filteredBooks.length > 0 ? (
                    <section data-testid="book-container">
                        <BookShelfComponent books={filteredBooks} />
                    </section>
                ) : (
                    <em>No books found</em>
                )}
            </div>
        </>
    );
}

export default Home;

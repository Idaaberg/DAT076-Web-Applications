import { useEffect, useState } from "react"
import { NavbarComponent } from "../components/NavBar"
import { Book, getBooks } from '../api'
import { BookShelfComponent } from '../components/BookShelf'

function Home() {

    const [books, setBooks] = useState<Book[]>([])
    
    useEffect(() => {
        async function loadBooks() {
        const bs = await getBooks();  
        setBooks(bs);  
        }
        loadBooks(); 
    }, []);

    return (
        <>
        <NavbarComponent /> 
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
export default Home
import { Book } from './api';
import { BookComponent } from './Book';

export function BookShelfComponent({ books }: { books : Book[]}) {
    return (
        <div className='d-flex flex-column align-items-center'> 
            <ul className="row bookShelfHeader mb3 fw-bold">
                <div>Cover</div>
                <div>Title</div>
                <div>Author</div>
                <div>Status</div>
                <div>Rating</div>
            </ul>
            <ul className="book-list d-flex flex-wrap">
                {books.map((book, index) => (
                    <BookComponent key={index} book={book} />
                ))}
            </ul>
        </div>
    );
}



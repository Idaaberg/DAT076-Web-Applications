import { Book } from './api';
import { BookComponent } from './Book';

export function BookShelfComponent({ books }: { books : Book[]}) {
    return (
        <div> 
            <ul className="bookShelfHeader">
                <div>Cover</div>
                <div>Title</div>
                <div>Author</div>
                <div>Status</div>
                <div>Rating</div>
            </ul>
            <ul>
                {books.map((book, index) => (
                    <BookComponent key={index} book={book} />
                ))}
            </ul>
        </div>
    );
}



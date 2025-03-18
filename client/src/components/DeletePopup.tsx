import { useNavigate } from "react-router-dom";
import { deleteBook } from "../api";
import "../styles/deletebutton.css";


interface DeletePopupProps {
    bookId: number;
    setPopupOpen: (open: boolean) => void;
}

/**
 * Popup to confirm deletion of a book
 * @param bookId
 * @param setPopupOpen 
 * @returns DeletePopup component
 */
export function DeletePopup({ bookId, setPopupOpen }: DeletePopupProps) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteBook(bookId);
            navigate("/home");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="popupContainer">
            <div className="popupContent">
                <p>Are you sure you want to delete this book?</p>
                <div className="popupButtons">
                    <button className="cancelDeleteBtn" type="button" onClick={() => setPopupOpen(false)}>
                        Cancel
                    </button>
                    <button className="deleteBtn" onClick={() => {
                        localStorage.setItem("bookDeleted", "true");
                        handleDelete();}
                    }>Delete Book</button>
                </div>
            </div>
        </div>
    );
}
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../api";
import "../styles/deletebutton.css";


interface DeleteButtonProps {
    bookId: number;
}

export function DeleteButton({ bookId }: DeleteButtonProps) {
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
        <button className="deleteBtn" onClick={handleDelete} >Delete Book</button>
    )
}
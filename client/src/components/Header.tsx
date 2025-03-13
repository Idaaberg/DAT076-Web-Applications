import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();


    const handleHeaderClick = () => {
        navigate("/home");
    }

    return (
        <header className="bookShelfIcon">
            <h3 
                className="headerText" 
                onClick={handleHeaderClick} 
                style={{ cursor: 'pointer'}} 
                tabIndex={0}
            >
                BookShelf
            </h3>
        </header>
    );
}
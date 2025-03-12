import "../styles/navbar.css";

interface HeaderProps {
    onClick: () => void;
}

export default function Header({ onClick }: HeaderProps) {
    return (
        <header className="bookShelfIcon">
            <h3 
                className="headerText" 
                onClick={onClick} 
                style={{ cursor: 'pointer'}} 
                tabIndex={0}
            >
                BookShelf
            </h3>
        </header>
    );
}
interface HeaderProps {
    onClick: () => void;
}

export default function Header({ onClick }: HeaderProps) {
    return (
        <header className="bookShelfIcon" onClick={onClick} style= {{ cursor: 'pointer'}}>
            <h3 className="headerText">BookShelf</h3>
        </header>
    )
}
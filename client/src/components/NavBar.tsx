import "../styles/navbar.css";
import { SearchFilterComponent } from "./SearchFilter"; 

interface NavbarProps {
    search: string;
    setSearch: (value: string) => void;
    setFilterBy: (filter: "title" | "author" | "state" | "rating") => void;
}

export function NavbarComponent({ search, setSearch, setFilterBy }: NavbarProps) {
    return (
        <nav>
            <div className="bar">
                <h3 className="logo">BookShelf</h3>

                <SearchFilterComponent 
                    search={search} 
                    setSearch={setSearch} 
                    setFilterBy={setFilterBy} 
                />

                <div className="addBook">
                    <a href="/add">
                        <button className="addBtn" type="button">Add Book</button>
                    </a>
                </div>
            </div>
        </nav>
    );
}

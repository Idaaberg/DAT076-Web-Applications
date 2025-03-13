import "../styles/navbar.css";
import { SearchFilterComponent } from "./SearchFilter";


interface NavbarProps {
    search: string;
    setSearch: (value: string) => void;
    setFilterBy: (filter: "title" | "author" | "state" | "rating") => void;
}

/**
 * Defines the Navbar component
 * @param search - the search string
 * @param setSearch - the function to set the search string
 * @param setFilterBy - the function to set the filter
 * @returns Navbar component
 */
export function NavbarComponent({ search, setSearch, setFilterBy }: NavbarProps) {
    return (
        <nav>
            <div className="bar">
                <h3 className="logo">BookShelf</h3>
                <div className="search">
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
                <div className="profile">
                    <a href="/profile">
                        <button className="profileBtn" type="button">Profile</button>
                    </a>
                </div>
            </div>
        </nav >
    );
}

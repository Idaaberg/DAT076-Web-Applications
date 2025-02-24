import '../styles/navbar.css';


export function NavbarComponent() {
    return (
        <nav>
            <div className="bar">
                <h3 className='logo'>BookShelf</h3>

                <div className='searchFilter'>
                    <form className="searchArea" role="search">
                        <input id="searchBar" className="searchbar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="searchBtn" type="button">Search</button>
                    </form>

                    <div className="dropdown">
                        <button className="filterBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter
                        </button>
                        <ul className="dropdownMenu">
                        </ul>
                    </div>
                </div>
                <div className='addBook'>
                    <a href="/add">
                        <button className="addBtn" type="button">Add Book</button>
                    </a>
                </div>
            </div>
        </nav>
    );
}
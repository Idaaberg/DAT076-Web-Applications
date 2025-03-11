import { useState } from "react";
import "../styles/search-filter.css";


interface SearchFilterProps {
    search: string;
    setSearch: (value: string) => void;
    setFilterBy: (filter: "title" | "author" | "state" | "rating") => void;
}

/**
 * Defines the SearchFilter component
 * @param search - the search string
 * @param setSearch - the function to set the search string
 * @param setFilterBy - the function to set the filter
 * @returns SearchFilter component
 */
export function SearchFilterComponent({ search, setSearch, setFilterBy }: SearchFilterProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Filter");

    function handleFilterChange(filter: "title" | "author" | "state" | "rating") {
        setFilterBy(filter);
        setSelectedFilter(filter.charAt(0).toUpperCase() + filter.slice(1));
        setDropdownOpen(false);
    }

    return (
        <div className="searchFilter">
            <form className="searchArea" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    id="searchBar"
                    className="searchbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <div className="dropdown">
                <button
                    data-testid="filterBtn"
                    className="filterBtn"
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {selectedFilter}
                </button>

                {dropdownOpen && (
                    <ul className="dropdownMenu">
                        <li><button onClick={() => handleFilterChange("title")}>Title</button></li>
                        <li><button onClick={() => handleFilterChange("author")}>Author</button></li>
                        <li><button onClick={() => handleFilterChange("state")}>State</button></li>
                        <li><button onClick={() => handleFilterChange("rating")}>Rating</button></li>
                    </ul>
                )}
            </div>
        </div>
    );
}

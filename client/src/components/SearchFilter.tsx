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
    const [selectedFilter, setSelectedFilter] = useState("Filter");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleFilterChange(filter: "title" | "author" | "state" | "rating") {
        setFilterBy(filter);
        setSelectedFilter(filter);
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
                <select
                    data-testid="filterBtn"
                    className={`filterBtn ${isDropdownOpen ? 'open' : ''}`}
                    value={selectedFilter}
                    onChange={(e) => handleFilterChange(e.target.value as "title" | "author" | "state" | "rating")}
                    onFocus={() => setIsDropdownOpen(true)} // Set dropdown as open when focused
                    onBlur={() => setIsDropdownOpen(false)} // Set dropdown as closed when focus is lost
                >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="state">Status</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
        </div>
    );
}

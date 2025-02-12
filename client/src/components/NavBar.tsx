import { Link } from 'react-router-dom';
import '../styles/NavbarStyles.css';


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
                        {/* <li><a className="dropdown-item" href="#">Want to Read</a></li>
                        <li><a className="dropdown-item" href="#">Currently Reading</a></li>
                        <li><a className="dropdown-item" href="#">Finished Reading</a></li>
                        <li><a className="dropdown-item" href="#">Rating</a></li>
                        <li><a className="dropdown-item" href="#">Author last name a-z</a></li>
                        <li><a className="dropdown-item" href="#">Title a-z</a></li> */}
                    </ul>
                </div>
            </div>
            <div className='addBook'>
                <Link to="/add">
                    <button className="addBtn" type="button">Add Book</button>
                </Link>
            </div>
        </div>
    </nav>
  );
}

 {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
     <div class="container-fluid justify-content-between">
         <!-- Left Side: Brand -->
//       <a class="navbar-brand" href="#">BookShelf</a>
//         <!-- Center: Search Bar and Filter Button -->
//       <div class="d-flex align-items-center">
//         <form class="d-flex me-3" role="search">
//           <input id="searchBar" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
//           <button class="btn pinkBtn" type="button">Search</button>
//         </form>
//         <!-- Filter Button -->
//         <div class="dropdown">
//           <button class="btn btn-secondary dropdown-toggle pinkBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Filter
//           </button>
//           <ul class="dropdown-menu">
//             <li><a class="dropdown-item" href="#">Want to Read</a></li>
//             <li><a class="dropdown-item" href="#">Currently Reading</a></li>
//             <li><a class="dropdown-item" href="#">Finished Reading</a></li>
//             <li><a class="dropdown-item" href="#">Rating</a></li>
//             <li><a class="dropdown-item" href="#">Author last name a-z</a></li>
//             <li><a class="dropdown-item" href="#">Title a-z</a></li>
//           </ul>
//         </div>
//       </div>
//       <!-- Right Side: Dropdown and Add Book Button -->
//       <div class="d-flex align-items-center">
//         <!-- Add Book Button -->
//         <a href="AddBook.html">
//           <button class="btn btn-outline-success purpleBtn" type="button">Add Book</button>
//         </a>
//       </div>
//     </div>
//   </nav> */}
import axios from 'axios';

axios.defaults.withCredentials = true;

export type Book = {
  id: number;
  title: string;
  author: string;
  state: BookState;
  rating?: number;
  comment?: string;
}

export enum BookState {
    HaveRead = "Have Read",
    WantToRead = "Want to Read",
    Reading = "Reading",
}

const BASE_URL = "http://localhost:8080"

/**
 * Retrieves all books from the server
 * @returns an array of all books
 */
export async function getBooks(): Promise<Book[]> {
  const response = await axios.get<Book[]>(`${BASE_URL}/book`)
  return response.data
}

/**
 * Retrieves a single book by its ID
 * @param id - the ID of the book to retrieve
 * @returns the book with the given ID
 */
export async function getBookById(id: string): Promise<Book | null> {
  console.log("i GetBookById API")
  const response = await axios.get<Book>(`${BASE_URL}/book/${id}`)
  console.log("i GetBookById 2")

  return response.data;
}

/**
 * Adds a book to the user's bookshelf
 * @param title 
 * @param author 
 * @param state 
 * @param rating 
 * @param comment 
 * @returns the created book
 */
export async function addBook(title: string, author: string, state: BookState, rating?: number, comment?: string): Promise<Book> {
  const response = await axios.post<Book>(`${BASE_URL}/book`, { title, author, state, rating, comment })
  return response.data
}

/**
 * Edits a book from the user's bookshelf
 * @param id - the ID of the book to delete
 * @returns the edited book
 */
export async function editBook(id: number, title: string, author: string, state: BookState, rating?: number, comment?: string): Promise<Book> {
  const response = await axios.patch<Book>(`${BASE_URL}/book/${id}`, { title, author, state, rating, comment })
  return response.data
}

export async function deleteBook(id: number): Promise<boolean> {
  const response = await axios.delete<boolean>(`${BASE_URL}/book/${id}`)
  return response.data
}

/**
 * Registers a new user
 * @param username 
 * @param password 
 * @returns the created user
 */
export async function register(username: string, password: string): Promise<void> {
  const response = await axios.post(`${BASE_URL}/user`, { username, password })
  return response.data
}

/**
 * Logs in an existing user
 * @param username 
 * @param password 
 * @returns the logged in user
 */
export async function login(username: string, password: string): Promise<void> {
  const response = await axios.post(`${BASE_URL}/user/login`, { username, password })
  return response.data
}

/**
 * Logs out the current user
 */
export async function logout(): Promise<void> {
  const response = await axios.post(`${BASE_URL}/user/logout`)
  return response.data
}

/**
 * Checks if a username already exists
 * @param username 
 * @returns a boolean indicating if the username exists, true if exists, false otherwise
 */
export async function checkUsernameExists(username: string): Promise<boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/user/exists?username=${username}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking username existence:", error);
    return false;
  }
}

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

export async function getBooks(): Promise<Book[]> {
  const response = await axios.get<Book[]>(`${BASE_URL}/book`)
  return response.data
}

export async function getBookById(id: string): Promise<Book | null> {
  console.log("i GetBookById API")
  const response = await axios.get<Book>(`${BASE_URL}/book/${id}`)
  console.log("i GetBookById 2")

  return response.data;
}

export async function addBook(title: string, author: string, state: BookState, rating?: number, comment?: string): Promise<Book> {
  const response = await axios.post<Book>(`${BASE_URL}/book`, { title, author, state, rating, comment })
  return response.data
}

export async function editBook(id: number, title: string, author: string, state: BookState, rating?: number, comment?: string): Promise<Book> {
  const response = await axios.patch<Book>(`${BASE_URL}/book/${id}`, { title, author, state, rating, comment })
  return response.data
}

export async function register(username: string, password: string): Promise<void> {
  const response = await axios.post(`${BASE_URL}/user`, { username, password })
  return response.data
}

export async function login(username: string, password: string): Promise<void> {
  const response = await axios.post(`${BASE_URL}/user/login`, { username, password })
  return response.data
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/user/exists?username=${username}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking username existence:", error);
    return false;
  }
}

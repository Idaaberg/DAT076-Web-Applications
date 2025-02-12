import axios from 'axios';

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

export async function addBook(title: string, author: string, state: BookState, rating?: number, comment?: string): Promise<Book> {
  const response = await axios.post<Book>(`${BASE_URL}/book`, { title, author, state, rating, comment })
  return response.data
}

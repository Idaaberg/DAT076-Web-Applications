export interface Book {
    id: number;
    title: string;
    author: string;
    state: BookState;
    rating?: number;
    comment?: string;
   // img: string;
}

export enum BookState {
    HaveRead = "have read",
    WantToRead = "want to read",
    Reading = "reading",
  }
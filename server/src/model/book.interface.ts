export interface Book {
    id: number;
    title: string;
    author: string;
    state: BookState;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    comment?: string;
}

export enum BookState {
    HaveRead = "Have Read",
    WantToRead = "Want to Read",
    Reading = "Reading",
}
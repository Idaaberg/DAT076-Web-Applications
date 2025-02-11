export interface Book {
    id: number;
    title: string;
    author: string;
    state: BookState;
    rating?: 1 | 2 | 3 | 4 | 5;
    comment?: string;
}

export enum BookState {
    HaveRead = "have read",
    WantToRead = "want to read",
    Reading = "reading",
}
import * as SuperTest from "supertest";
import { app } from "./start";
import { Book, BookState } from "./model/book.interface";

const request = SuperTest.default(app);

test("Creating a book should add book to list of books", async () => {
    const title = "Test Title";
    const author = "Test Author";
    const state: BookState = BookState.HaveRead;
    const rating = 5;
    const comment = "Test Comment";

    const res1 = await request.post("/book").send({
        title : title, 
        author : author, 
        state : state, 
        rating : rating, 
        comment : comment});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.title).toEqual(title);
    expect(res1.body.author).toEqual(author);
    expect(res1.body.state).toEqual(state);
    expect(res1.body.rating).toEqual(rating);
    expect(res1.body.comment).toEqual(comment);

    const res2 = await request.get("/book");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((book : Book) => book.title)).toContain(title);
});

test("Editing a book should update the book in the list of books", async () => {
    const title = "Test Title";
    const author = "Test Author";
    const state: BookState = BookState.HaveRead;
    const rating = 5;
    const comment = "Test Comment";

    const res1 = await request.post("/book").send({
        title : title, 
        author : author, 
        state : state, 
        rating : rating, 
        comment : comment});
    
    const newTitle = "New Title";
    const newAuthor = "New Author";
    const newState: BookState = BookState.WantToRead;
    const newRating = 4;
    const newComment = "New Comment";

    const res2 = await request.patch(`/book/${res1.body.id}`).send({
        title : newTitle, 
        author : newAuthor, 
        state : newState, 
        rating : newRating, 
        comment : newComment});
    expect(res2.statusCode).toEqual(200);

    const res3 = await request.get("/book");
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.map((book : Book) => book.title)).toContain(newTitle);
    expect(res3.body.map((book : Book) => book.author)).toContain(newAuthor);
    expect(res3.body.map((book : Book) => book.state)).toContain(newState);
    expect(res3.body.map((book : Book) => book.rating)).toContain(newRating);
    expect(res3.body.map((book : Book) => book.comment)).toContain(newComment);
});
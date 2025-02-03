import * as SuperTest from "supertest";
import { app } from "./start";
import { Book, BookState } from "./model/book.interface";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
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

test("End-to-end test", async () => {
    const title = "Test Title";
    const author = "Test Author";
    const state: BookState = BookState.HaveRead;
    const rating = null;
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
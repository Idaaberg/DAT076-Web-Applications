import { app } from "./start";
import { Book, BookState } from "./model/book.interface";

const session = require("supertest-session");

function createSession() {
    return session(app);
}

async function register(request: any) {
    await request.post("/user").send({
        username: "TestUser",
        password: "TestPassword",
    });
}

async function login(request: any) { 
    await request.post("/user/login").send({
        username: "TestUser",
        password: "TestPassword",
    });
}

test("Registering a user should return 201 created response", async () => {
    const request = createSession();

    const postUser = await request.post("/user").send({
        username: "TestUser",
        password: "TestPassword",
    });

    expect(postUser.statusCode).toEqual(201);
    expect(postUser.body.username).toEqual("TestUser");
})

test("Logging in a user should return 200 OK response", async () => {
    const request = createSession();

    await request.post("/user").send({
        username: "TestUser",
        password: "TestPassword",
    });

    const loginUser = await request.post("/user/login").send({
        username: "TestUser",
        password: "TestPassword",
    });

    expect(loginUser.statusCode).toEqual(200);
})

test("Creating a book should add book to list of books", async () => {
    const request = createSession(); 

    await register(request);
    await login(request);

    const title = "Test Title";
    const author = "Test Author";
    const state: BookState = BookState.HaveRead;
    const rating = 5;
    const comment = "Test Comment";

    const res1 = await request.post("/book").send({
        title,
        author,
        state,
        rating,
        comment
    });

    expect(res1.statusCode).toEqual(201);
    expect(res1.body.title).toEqual(title);
    expect(res1.body.author).toEqual(author);
    expect(res1.body.state).toEqual(state);
    expect(res1.body.rating).toEqual(rating);
    expect(res1.body.comment).toEqual(comment);

    const res2 = await request.get("/book");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((book: Book) => book.title)).toContain(title);
});

test("Editing a book should update the book in the list of books", async () => {
    const request = createSession(); 

    await register(request);
    await login(request);

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
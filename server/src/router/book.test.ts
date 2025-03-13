import request from "supertest";
import express from "express";
import session from "express-session";
import { bookRouter } from "../router/book";
import { IBookService } from "../service/IBookService.interface";
import { userRouter } from "./user";
import { IUserService } from "../service/IUserService.interface";


const mockBookService: IBookService = {
    getBooks: jest.fn(),
    getBookById: jest.fn(),
    addBook: jest.fn(),
    editBook: jest.fn(),
    deleteBook: jest.fn(),
};

const mockUserService: IUserService = {
    createUser: jest.fn(),
    findUser: jest.fn(),
};

const app = express();
app.use(express.json());
app.use(
    session({
        secret: "test-secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use("/book", bookRouter(mockBookService));
app.use("/user", userRouter(mockUserService));

describe("Book Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(async () => {
        // Create a user before all tests
        const agent = request.agent(app);
        (mockUserService.createUser as jest.Mock).mockResolvedValue(undefined);
        await agent.post("/user").send({ username: "testUser", password: "testPassword" });
    });

    test("GET /book should return books if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        (mockBookService.getBooks as jest.Mock).mockResolvedValue([{ title: "Book1", author: "Author1", state: "Have Read" }]);

        const response = await agent.get("/book");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: "Book1", author: "Author1", state: "Have Read" }]);
    });

    test("GET /book should return 401 if not logged in", async () => {
        const response = await request(app).get("/book");
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });

    test("GET /book/:id should return book details if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        (mockBookService.getBookById as jest.Mock).mockResolvedValue({ title: "Book1", author: "Author1", state: "Have Read" });

        const response = await agent.get("/book/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ title: "Book1", author: "Author1", state: "Have Read" });
    });

    test("GET /book/:id should return 401 if not logged in", async () => {
        const response = await request(app).get("/book/1");
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });

    test("POST /book should create a book if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        (mockBookService.addBook as jest.Mock).mockResolvedValue({ title: "Book1", author: "Author1", state: "Have Read" });

        const response = await agent.post("/book").send({
            title: "Book1",
            author: "Author1",
            state: "Have Read",
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ title: "Book1", author: "Author1", state: "Have Read" });
    });

    test("POST /book should return 401 if not logged in", async () => {
        const response = await request(app).post("/book").send({
            title: "Book1",
            author: "Author1",
            state: "Have Read",
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });

    test("PATCH /book/:id should edit a book if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        (mockBookService.editBook as jest.Mock).mockResolvedValue(true);

        const response = await agent.patch("/book/1").send({
            title: "Updated Book",
            author: "Updated Author",
            state: "Reading",
        });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Book has been edited!");
    });

    test("PATCH /book/:id should return 401 if not logged in", async () => {
        const response = await request(app).patch("/book/1").send({
            title: "Updated Book",
            author: "Updated Author",
            state: "Reading",
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });

    test("DELETE /book/:id should delete a book if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        (mockBookService.deleteBook as jest.Mock).mockResolvedValue(true);

        const response = await agent.delete("/book/1");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Book with id 1 has been deleted");
    });

    test("DELETE /book/:id should return 401 if not logged in", async () => {
        const response = await request(app).delete("/book/1");
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });
});
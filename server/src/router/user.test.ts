import request from "supertest";
import express from "express";
import session from "express-session";
import { userRouter } from "../router/user";
import { IUserService } from "../service/IUserService.interface";


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
app.use("/user", userRouter(mockUserService));

describe("User Router", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("POST /user should create a user and return 201", async () => {
        (mockUserService.createUser as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app)
            .post("/user")
            .send({ username: "testUser", password: "testPassword" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ username: "testUser" });
        expect(mockUserService.createUser).toHaveBeenCalledWith("testUser", "testPassword");
    });

    test("POST /user/login should log in a user and return 200", async () => {
        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });

        const response = await request(app)
            .post("/user/login")
            .send({ username: "testUser", password: "testPassword" });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Logged in");
        expect(mockUserService.findUser).toHaveBeenCalledWith("testUser", "testPassword");
    });

    test("POST /user/login should return 401 if user not found", async () => {
        (mockUserService.findUser as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app)
            .post("/user/login")
            .send({ username: "wrongUser", password: "wrongPass" });

        expect(response.status).toBe(401);
        expect(response.text).toBe("No such username or password");
    });

    test("POST /user/logout should log out a user and return 200", async () => {
        const response = await request(app).post("/user/logout");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Logged out");
    });

    test("GET /user should return username if logged in", async () => {
        const agent = request.agent(app);

        (mockUserService.createUser as jest.Mock).mockResolvedValue(undefined);
        await agent.post("/user").send({ username: "testUser", password: "testPassword" });

        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });
        await agent.post("/user/login").send({ username: "testUser", password: "testPassword" });

        const response = await agent.get("/user");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ username: "testUser" });
    });

    test("GET /user should return 401 if not logged in", async () => {
        const response = await request(app).get("/user");
        expect(response.status).toBe(401);
        expect(response.text).toBe("Not logged in");
    });

    test("GET /user/exists should return true if user exists", async () => {
        (mockUserService.findUser as jest.Mock).mockResolvedValue({ username: "testUser" });

        const response = await request(app).get("/user/exists?username=testUser");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ exists: true });
    });

    test("GET /user/exists should return false if user does not exist", async () => {
        (mockUserService.findUser as jest.Mock).mockResolvedValue(undefined);

        const response = await request(app).get("/user/exists?username=unknownUser");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ exists: false });
    });

    test("GET /user/exists should return 400 if no username is provided", async () => {
        const response = await request(app).get("/user/exists");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Username query parameter is required" });
    });
});
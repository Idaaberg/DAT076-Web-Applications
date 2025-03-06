
import { conn } from "../db/conn";
import { UserModel } from "../db/user.db";
import { UserService } from "../service/user";
import bcrypt from "bcrypt";
import { BookService } from "./book";

beforeAll(async () => {
    await conn.sync({ force: true });
});

afterAll(async () => {
    await conn.close();
});


describe("UserService", () => {
    let userService: UserService;

    beforeAll(async () => {
        userService = new UserService();

        await UserModel.create({
            username: 'testuser',
            password: 'password',
        });
    });

    test("Creating a user should store it in the users list", async () => {
        await userService.createUser("TestUser", "TestPassword");

        const user = await userService.findUser("TestUser");
        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser");
    });

    test("Finding a user should return the correct user", async () => {
        await userService.createUser("TestUser1", "TestPassword");
        const user = await userService.findUser("TestUser1");

        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser1");
    });

    test("Finding a user with the correct password should return the user", async () => {
        await userService.createUser("TestUser2", "TestPassword2");
        const user = await userService.findUser("TestUser2", "TestPassword2");

        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser2");
    });

    test("Finding a user with an incorrect password should return undefined", async () => {
        await userService.createUser("TestUser3", "CorrectPass");
        const user = await userService.findUser("TestUser3", "WrongPass");

        expect(user).toBeUndefined();
    });

    test("Finding a non-existent user should return undefined", async () => {
        const user = await userService.findUser("NonExistentUser");
        expect(user).toBeUndefined();
    });

    test("Passwords should be hashed and not stored in plaintext", async () => {
        await userService.createUser("TestUser4", "TestPassword4");
        const user = await userService.findUser("TestUser4");

        expect(user).toBeDefined();
        expect(user?.password).not.toBe("TestPassword4");
        expect(await bcrypt.compare("TestPassword4", user!.password)).toBe(true);
    });
});

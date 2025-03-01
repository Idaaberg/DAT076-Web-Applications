import { UserService } from "../service/user";
import bcrypt from "bcrypt";

describe("UserService", () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    test("Creating a user should store it in the users list", async () => {
        await userService.createUser("TestUser", "TestPassword");
        
        const user = await userService.findUser("TestUser");
        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser");
    });

    test("Finding a user should return the correct user object", async () => {
        await userService.createUser("TestUser", "TestPassword");
        const user = await userService.findUser("TestUser");
        
        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser");
    });

    test("Finding a user with the correct password should return the user", async () => {
        await userService.createUser("TestUser", "TestPassword");
        const user = await userService.findUser("TestUser", "TestPassword");
        
        expect(user).toBeDefined();
        expect(user?.username).toBe("TestUser");
    });

    test("Finding a user with an incorrect password should return undefined", async () => {
        await userService.createUser("TestUser", "CorrectPass");
        const user = await userService.findUser("TestUser", "WrongPass");
        
        expect(user).toBeUndefined();
    });

    test("Finding a non-existent user should return undefined", async () => {
        const user = await userService.findUser("NonExistentUser");
        expect(user).toBeUndefined();
    });

    test("Passwords should be hashed and not stored in plaintext", async () => {
        await userService.createUser("TestUser", "TestPassword");
        const user = await userService.findUser("TestUser");
        
        expect(user).toBeDefined();
        expect(user?.password).not.toBe("TestPassword"); 
        expect(await bcrypt.compare("TestPassword", user!.password)).toBe(true); 
    });
});

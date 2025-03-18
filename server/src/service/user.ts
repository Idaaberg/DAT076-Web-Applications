import { User } from "../model/user";
import bcrypt from "bcrypt";
import { IUserService } from "./IUserService.interface";
import { UserModel } from "../db/user.db";


const salt = bcrypt.genSaltSync(10);

/**
 * Service for user-related operations
 */
export class UserService implements IUserService {
    /**
     * Creates a new user and encrypts the password
     * @param username - The username of the new user
     * @param password - The password of the new user
     * @returns The created UserModel instance if successful, or null if the username already exists
    */
    async createUser(username: string, password: string) : Promise<UserModel | null> {
        if (await UserModel.findOne({ where: { username: username }})) {
            return null;
        }
        return await UserModel.create({
            username: username,
            password: bcrypt.hashSync(password, salt)
        });
    }

    /**
     * Finds a user by username and/or password
     * @param username 
     * @param password 
     * @returns 
     */
    async findUser(username: string, password?: string): Promise<User | undefined> {
        const user = await UserModel.findOne({ where: { username: username }});
        if (! password) {
            const foundUser = await UserModel.findOne({ where: { username }});
            return foundUser ? foundUser : undefined;
        }   
        if (password && user) {
            const match = await bcrypt.compare(password, user.password); 
            if (!match) return undefined;
            const foundUser = await UserModel.findOne({ where: { username: username, password: user.password }});
            return foundUser ? foundUser : undefined;
        }
    }
}
import { UserModel } from "../db/user.db";
import { User } from "../model/user";

export interface IUserService {
    createUser(username: string, password: string): Promise<UserModel | null>;
    findUser(username: string, password?: string): Promise<User | undefined>;
}
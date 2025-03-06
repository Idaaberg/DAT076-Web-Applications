import { User } from "../model/user";
import bcrypt from "bcrypt";
import { IUserService } from "./IUserService.interface";
import { UserModel } from "../db/user.db";

const salt = bcrypt.genSaltSync(10);

export class UserService implements IUserService {

    async createUser(username: string, password: string) : Promise<UserModel | null> {
        if (await UserModel.findOne({ where: { username: username }})) {
            return null;
        }
        return await UserModel.create({
            username: username,
            password: bcrypt.hashSync(password, salt)
        });
    }

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
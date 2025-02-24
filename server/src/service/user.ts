import {User} from "../model/user";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export class UserService{
    users : User[] = [];

    async createUser(username: string, password: string) {
        this.users.push({
            username: username,
            password: bcrypt.hashSync(password, salt),
            books: []
        });
    }

    async findUser(username: string, password ?: string): Promise<User | undefined> {
        if (! password) {
            return this.users.find((user) => user.username === username);
        }
        return this.users.find((user) => user.username === username && bcrypt.compare(password, user.password));
    }
}
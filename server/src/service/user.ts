import { User } from "../model/user";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export class UserService {
    users: User[] = [];

    async createUser(username: string, password: string) {
        this.users.push({
            username: username,
            password: bcrypt.hashSync(password, salt),
            books: []
        });
    }

    async findUser(username: string, password?: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.username === username);
        if (!user) return undefined;

        if (password) {
            const match = await bcrypt.compare(password, user.password); 
            if (!match) return undefined;
        }

        return user;
    }
}
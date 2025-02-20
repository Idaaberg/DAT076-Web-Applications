import {User} from "../model/user";

export class UserService{
    users : User[] = [];

    async createUser(username: string, password: string) {
        this.users.push({
            username: username,
            password: password,
            books: []
        });
    }

    async findUser(username: string, password ?: string): Promise<User | undefined> {
        if (! password) {
            return this.users.find((user) => user.username === username);
        }
        return this.users.find((user) => user.username === username && user.password === password);
    }
}
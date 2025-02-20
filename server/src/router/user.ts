import express, { Request, Response, Router } from "express";
import { UserService } from "../service/user";
import { User } from "../model/user";

export function userRouter(userService: UserService): Router {
    const userRouter = express.Router();

    interface UserRequest extends Request {
        body: { username: string, password: string },
        session: any
    }

    userRouter.post("/", async (req: UserRequest, res: Response) => {
        await userService.createUser(req.body.username, req.body.password);
        res.status(201).send({ username: req.body.username });
    })

    userRouter.post("/login", async (req: UserRequest, res: Response) => {
        const user: User | undefined = await userService.findUser(req.body.username, req.body.password);
        if (!user) {
            res.status(401).send("No such username or password");
            return;
        }
        req.session.username = req.body.username;
        res.status(200).send("Logged in");
    })

    userRouter.post("/logout", async (req: UserRequest, res: Response) => {
        delete req.session.username;
        res.status(200).send("Logged out");
    })

    return userRouter;
}
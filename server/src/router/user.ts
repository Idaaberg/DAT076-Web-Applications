import express, { Request, Response, Router, RequestHandler } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/IUserService.interface";

interface UserRequest extends Request {
    body: { username: string, password: string },
    session: any
}

interface UsernameQuery {
    username: string;
  }

export function userRouter(userService: IUserService): Router {
    const userRouter = express.Router();

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

    const existsHandler: RequestHandler<{}, any, any, UsernameQuery> = async (req, res) => {
        const { username } = req.query;
        if (!username) {
          res.status(400).send({ error: "Username query parameter is required" });
          return;
        }
        try {
          const user = await userService.findUser(username);
          res.status(200).json({ exists: !!user });
        } catch (error) {
          res.status(500).send("Internal server error");
        }
      };
    
    userRouter.get("/exists", existsHandler);

    return userRouter;
}
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

  // POST /user
  userRouter.post("/", async (req: UserRequest, res: Response) => {
    const { username, password } = req.body;
    const existingUser = await userService.findUser(username);

    try {
      if (existingUser) {
        res.status(400).send({ error: "Username already taken" });
        return;
      }
      await userService.createUser(username, password);
      res.status(201).send({ username: username });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  })

  // POST /user/login
  userRouter.post("/login", async (req: UserRequest, res: Response) => {
    const user: User | undefined = await userService.findUser(req.body.username, req.body.password);
    try {
      if (!user) {
        res.status(401).send("No such username or password");
        return;
      }
      req.session.username = req.body.username;
      res.status(200).send("Logged in");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  })

  // POST/user/logout
  userRouter.post("/logout", async (req: UserRequest, res: Response) => {
    try {
      delete req.session.username;
      res.status(200).send("Logged out");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
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

  // GET /user/exists
  userRouter.get("/exists", existsHandler);

  //GET /user
  userRouter.get("/", async (req: UserRequest, res: Response) => {
    try {
      if (!req.session.username) {
        res.status(401).send("Not logged in");
        return;
      }
      res.status(200).send({ username: req.session.username });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  return userRouter;
}
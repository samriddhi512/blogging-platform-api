import express from "express";
import morgan from "morgan";
import helmet from "helmet";
// import xss from "xss-clean";

import { router as postRouter } from "./routes/postRoutes";
import { errorController } from "./controllers/errorContoller";

export const app = express();

app.use(express.json());

// logging request info for dev env
if (process.env.ENV === "development") {
  app.use(morgan("tiny"));
}

// security middleware - add security headers to response sent
// tells the browser to behave securely. -setting default here for now.
app.use(helmet());

// strip the incoming request from sus script tags or such - to prevent xss
// app.use(xss());

// req query params is parsed with complete info
app.set("query parser", "extended");

app.use("/posts", postRouter);

// global error controller here
app.use(errorController);

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

import { app } from "./app";
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

process.on("unhandledRejection", (err: unknown) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

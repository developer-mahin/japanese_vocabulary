import { Server } from "http";
import app from "./app";
import { seedAdmin } from "./DB/seed";

const port = 5000;

function main() {
  const server: Server = app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
}

seedAdmin()
main();

import { app } from "./app.js";
import { PORT, HOST, NODE_ENV } from "./secrets.js";


const server = app.listen(PORT, HOST, (error) => {
  if (!error) {
    console.log(`Server is listening on port ${PORT}`);
  } else {
    console.error(`ERROR from server file: ${error.message}`);
    if ("DEV" === NODE_ENV) {
      console.error(error.stack);
    }
  }
});

server.on("error", (error) => {
  if ("DEV" === NODE_ENV) {
    console.error(`ERROR server error ${error.message}`);
  }
});

server.on("close", () => {
  if ("DEV" === NODE_ENV) {
    console.log("Closing server");
  }
})
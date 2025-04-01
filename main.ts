import { app } from "./app";
import { createConnection } from "./database";
createConnection().then((ele) => {
  app.listen(1000, () => console.log(" server is running "));
});

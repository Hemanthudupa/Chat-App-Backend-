import { app } from "./app";
import { createConnection, runAllMigrations } from "./database";
createConnection()
  .then((ele) => {
    runAllMigrations().then((ele) => {
      app.listen(1000, () => console.log(" server is running 1000"));
    });
  })
  .catch((err) => console.log("error came ", err.message));

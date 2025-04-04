import { app } from "./app";
import { createConnection, runAllMigrations } from "./database";
createConnection()
  .then((ele) => {
    runAllMigrations().then((ele) => {
      app.listen(5001, () => console.log(" server is running 5001"));
    });
  })
  .catch((err) => console.log("error came ", err.message));

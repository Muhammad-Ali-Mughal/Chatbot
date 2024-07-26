import app from "./app.js";
import { connectToDatabase } from "./database/connection.js";

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running and connceted to Database!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

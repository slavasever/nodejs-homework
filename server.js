const app = require("./app");
const mongoose = require("mongoose");

const URI = process.env.DB_HOST;
const PORT = process.env.PORT;

const connection = mongoose.connect(URI);

connection
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running on port: ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(error.message);

    process.exit(1);
  });

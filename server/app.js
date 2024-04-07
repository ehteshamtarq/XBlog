const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const  schema  = require("./handlers/handlers");
const morgan = require("morgan");
require("dotenv").config();
require("./config/dbConnect");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(morgan("dev"));

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

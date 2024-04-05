const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
require("./config/dbConnect");
const PORT = process.env.PORT || 5000;
const app = express();

app.use("/graphql", graphqlHTTP({schema: null, graphiql: true}));
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});


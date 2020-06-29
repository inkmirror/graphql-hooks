const express = require('express');
const graphqlHTTP = require('express-graphql');
require('dotenv').config()
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
   console.log('Connected to DB');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Listening on port 4000')
});
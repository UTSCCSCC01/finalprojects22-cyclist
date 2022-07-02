const Express = require("express");
const BodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");
const mySchema = require("./api/schema/schema");
const myResolver = require("./api/resolver/resolver");
const auth = require("./api/auth");
let app = Express();

// const cors = require('cors');
// app.use(cors({
//   origin: 'https://mdtogether.live'
// }));
app.use(BodyParser.json());
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',"POST,GET,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization");
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});
app.use(auth);
app.use("/graphql", graphqlHTTP({
    schema: mySchema,
    rootValue: myResolver,
    graphiql: true
}));

const http = require('http');
const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
})

mongoose.connect("mongodb+srv://Cyclist:Cyclist@cyclist.mqfvr.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to mongodb on port %s", PORT);
})
.catch(err => console.error(err));

const express = require("express");

const app = express();

app.get('/',(request,response) => {
  response.status(200);
  response.send("hello express");
  response.send();
})

app.get('/reset',(request,response) => {
  response.json({
    result: 1,
    msg: "hello express"
  })
})
app.listen(3180)
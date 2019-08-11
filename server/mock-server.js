const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 4000

var databasePath = path.resolve('./server/db.json')
var db = JSON.parse(fs.readFileSync(databasePath))

function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
  console.log(`ERROR ${this.msg}`)
}

NotFound.prototype.__proto__ = Error.prototype;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/accounts', function (req, res) {
  console.log(`Got GET Request ${req}!`);
  console.log(`Sending ${JSON.stringify(db)}`)
  res.status(200).json(db)
})

app.post('/accounts', function (req, res, next) {
  // console.log(`Got POST Request ${(req.body)}!`);
  var newAccount = req.body
  console.log(newAccount)
  var newId = new Date().getTime()
  newAccount.id = newId
  newAccount.version = 1
  newAccount.links = [{
    "rel": "self",
    "href": `${req.protocol}://${req.hostname}:${port}/account/${newAccount.id}`
  }]
  db.push(newAccount)
  fs.writeFileSync(databasePath, JSON.stringify(db))
  res.json(db)
})

app.put('/accounts/:id', function (req, res, next) {
  let updateSpec = JSON.parse(req.body)
  let itemIndex = db.findIndex(x => x.id === req.params.accountId)
  db[itemIndex] = updateSpec;
  fs.writeFileSync(databasePath, JSON.stringify(db))
  console.log(`Updated: ${db}!`)
  res.json(db)
})

app.delete('/accounts/:id', 
function (req, res) {
  console.log(`Got DELETE Request id=${Number(req.params.id)}!`)
  var item = db.find(x => Number(x.id) === Number(req.params.id))
  console.log(item)
  if (item ===undefined){
    res.status(404).json({"error": {'resource':req.params.id, 'message': 'Not Found!' }})
    throw new NotFound(`${req.params.id} not found!`)
  } else {
    res.locals = item
    db.pop(res.locals);
    fs.writeFileSync(databasePath, JSON.stringify(db))
    res.sendStatus(204)
}})


app.use(function (err, req, res, next) {
  console.log(`[ERROR]: ${new Date().toISOString()} ${req.originalUrl} ${err}`)
})
app.listen(port, () => console.log(`Moment API mock server listening on port ${port}!`))

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const HypersignAuth = require('hypersign-auth-js-sdk');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
const hypersign = new HypersignAuth(server);
app.post("/auth/login", hypersign.authenticate.bind(hypersign), async (req, res) => {
  try {
    const user = req.body.hsUserData;
    // res.status(200).send(authToken);
    res.status(200).send(user)
  } catch (e) {
    console.log(e)
    res.status(500).send({ status: 500, message: null, error: e.message });

  }

})

app.get('/register', (req, res) => {
  res.sendFile("./public/register.html", { root: __dirname })
})
// for registration

// Implement /register API: 
//Analogous to register user but not yet activate
app.post('/hs/api/v2/register', hypersign.register.bind(hypersign), (req, res) => {
  try {

    console.log('Register success');
    res.status(200).send({ status: 200, message: "Success", error: null });

  } catch (e) {

    res.status(500).send({ status: 500, message: null, error: e.message });

  }
})

// Implement /credential API: 
//Analogous to active user
app.get('/hs/api/v2/credential', hypersign.issueCredential.bind(hypersign), (req, res) => {
  try {
    console.log(4)
    console.log('Credential success');
    res.status(200).send({ status: 200, message: req.body.verifiableCredential, error: null });

  } catch (e) {

    res.status(500).send({ status: 500, message: null, error: e.message });

  }
})

app.get('/', (req, res) => {
  res.sendFile("./public/login.html", { root: __dirname })
})

app.get('/home', (req, res) => {
  res.sendFile("./public/home.html", { root: __dirname })
})
app.get('/protected', hypersign.authorize.bind(hypersign), (req, res) => {
  res.send({ message: 'this is a get api' })
})
app.post('/protected', hypersign.authorize.bind(hypersign), (req, res) => {
  res.send({ message: 'this is a post api' })
})
server.listen(port, () => {

  console.log('server is running on port', port);
})


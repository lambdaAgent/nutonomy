const express = require('express')
const next = require('next')
const createData = require('./dataWrangling/schema.js');
const path = require('path');
const indexReact = path.resolve(__dirname + '../../client/');


// const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  });

  server.get('/data', (req,res, next) => {
    return res.json(createData());
  });

  server.get('*', (req, res) => {
    // 404 not found
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
});

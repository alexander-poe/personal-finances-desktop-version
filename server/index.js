import 'babel-polyfill';
import express from 'express';
require('dotenv').config()
const bodyParser = require('body-parser');
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const DBURL = process.env.DBURL

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
app.use(bodyParser.json());
app.use(express.static(process.env.CLIENT_PATH));

const knex = require('knex')({
  client: 'pg',
  connection: DBURL
})

app.get('/checks', (req, res) => {
  knex('checks').select('id', 'amount', 'datedeposited', 'description', 'picture', 'reoccuring')
  .then(id => {
    console.log(id)
    return res.status(200).json({id})
  })
})

app.post('/checks', (req, res) => {
  let twenty = req.body.amount * .2
  let thirty = req.body.amount * .3
  let fifty = req.body.amount * .5
  var checkid = 20;
  knex.insert({
    amount: req.body.amount,
    datedeposited: new Date(),
    description: req.body.description,
    picture: req.body.picture,
    reoccuring: req.body.reoccuring
  }).into('checks').then(id => {
    return id
  }).then(id => {
    return knex('checks').select('id').then(id => {
      let currentId = 0;
      for (var i = 0; i < id.length; i++) {
          if (currentId < id[i].id) {
            currentId = id[i].id;
          }
      }
      return currentId;
    })
  }).then(id => {
  knex.insert({
    checkid: id,
    twenty,
    thirty,
    fifty
  }).into('checkterm').then(id => {
    return res.status(201).json({})
  })
  }).catch(e => {
    console.error(e)
    res.sendStatus(500)
  })
})

app.delete('/checks', (req, res) => {
  knex('checks').where({
    id: req.body.id
  }).del().then(id => {
    return res.json({id})
  }).catch(e => {
    console.error(e)
    res.sendStatus(500)
  })
})

app.get('/checkterm', (req, res) => {
  knex('checkterm').select('id','twenty', 'thirty', 'fifty', 'checkid')
  .then(id => {
    return res.status(200).json({id})
  })
})

app.post('/checkterm', (req, res) => {
  knex.insert({
    checkid: req.body.checkid,
    twenty: req.body.twenty,
    thirty: req.body.thirty,
    fifty: req.body.fifty
  }).into('checkterm').then(id => {
    return res.status(201).json({id})
  }).catch(e => {
    console.error(e)
    res.sendStatus(500)
  })
})

app.put('/checkterm', (req, res) => {
  knex('checkterm').where({
    id: req.body.id
  }).update({
    twenty: req.body.twenty,
    thirty: req.body.thirty,
    fifty: req.body.fifty
  }).then(id => {
    return res.json({id})
  }).catch(e => {
    console.error(e)
  })
})

app.get('/termtransactions', (req, res) => {
  knex('termtransactions').select('id', 'checktermid', 'transaction', 'description', 'photo')
  .then(id => {
    return res.status(200).json({id})
  })
})

app.post('/termtransactions', (req, res) => {
  console.log(req.body.transaction, req.body.checktermid)
  knex.insert({
    checktermid: req.body.checktermid,
    account: req.body.account,
    transactiondate: new Date(),
    transaction: req.body.transaction,
    description: req.body.description,
    photo: req.body.photo
  }).into('termtransactions').then(id => {
      return knex('checkterm')
      .where({id: req.body.checktermid})
      .select('twenty', 'thirty', 'fifty')
      .then(id => {
        return id
      })
  }).then(id => {
    let accounts = {
      twenty: id[0].twenty,
      thirty: id[0].thirty,
      fifty: id[0].fifty
    }
    let newBal = accounts[req.body.account] - req.body.transaction
    knex('checkterm').where({
      id: req.body.checktermid
    }).update({
      [req.body.account]: newBal,
    }).then(id => {
      return id;
    })
  }).then(id => {
    return res.status(201).json({id})
  }).catch(e => {
    console.error(e)
    res.sendStatus(500)
  })
})

app.delete('/termtransactions', (req, res) => {
  knex('termtransactions').where({
    id: req.body.id
  }).del().then(id => {
    return res.json({id})
  }).catch(e => {
    console.error(e)
    res.sendStatus(500)
  })
})

function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}

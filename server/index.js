import 'babel-polyfill';
import express from 'express';
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const DBURL = process.env.DBURL;
const cloudinary = require('cloudinary');

console.log(`Server running in ${process.env.NODE_ENV} mode`);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const app = express();
app.use(bodyParser.json());
app.use(express.static(process.env.CLIENT_PATH));

const knex = require('knex')({
  client: 'pg',
  connection: DBURL
})

app.post('/uploadPhoto', (req, res) => {
  cloudinary.uploader.upload("./server/node.png", function(result) {
    console.log(result)
  });
})

app.get('/checkJoin', (req, res) => {
  knex.select('*').from('checkterm').innerJoin('checks', 'checkid', 'checks.id')
  .then(id => {
    console.log('hereh', id)
    return res.status(200).json({id})
  })
})

app.get('/checks', (req, res) => {
  knex('checks')
  .select('id', 'amount', 'datedeposited', 'description', 'picture', 'reoccuring')
  .then(id => {
    return res.status(200).json({id})
  })
})


app.put('/checks', (req, res) => {
  knex('checks').where({
    id: req.body.id
  }).update({
    deleted: true
  }).then(id => {
    return res.json({id})
  }).catch(e => {
    console.error(e)
  })
})


app.post('/checks', (req, res) => {
  cloudinary.uploader.upload('./server/node.png', function(result) {
    return result
  }).then(photo => {
  let twenty = req.body.amount * .2
  let thirty = req.body.amount * .3
  let fifty = req.body.amount * .5
  var checkid = 20;
  knex.insert({
    amount: req.body.amount,
    datedeposited: new Date(),
    description: req.body.description,
    picture: photo.url,
    reoccuring: req.body.reoccuring,
    active: true,
    deleted: false
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
  })
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
  knex('termtransactions').select('id', 'checktermid', 'transactiondate', 'account', 'transaction', 'description', 'photo')
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

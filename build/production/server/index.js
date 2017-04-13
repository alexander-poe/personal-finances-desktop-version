'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('dotenv').config();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;
var HOST = process.env.HOST;
var DBURL = process.env.DBURL;
var cloudinary = require('cloudinary');

console.log('Server running in ' + process.env.NODE_ENV + ' mode');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var app = (0, _express2.default)();
app.use(bodyParser.json());
app.use(_express2.default.static(process.env.CLIENT_PATH));

var knex = require('knex')({
  client: 'pg',
  connection: DBURL
});

app.post('/uploadPhoto', function (req, res) {
  cloudinary.uploader.upload("./server/node.png", function (result) {
    console.log(result);
  });
});

app.get('/checkJoin', function (req, res) {
  knex.select('*').from('checkterm').innerJoin('checks', 'checkid', 'checks.id').then(function (id) {
    console.log('hereh', id);
    return res.status(200).json({ id: id });
  });
});

app.get('/checks', function (req, res) {
  knex('checks').select('id', 'amount', 'datedeposited', 'description', 'picture', 'reoccuring').then(function (id) {
    return res.status(200).json({ id: id });
  });
});

app.put('/checks', function (req, res) {
  knex('checks').where({
    id: req.body.id
  }).update({
    deleted: true
  }).then(function (id) {
    return res.json({ id: id });
  }).catch(function (e) {
    console.error(e);
  });
});

app.post('/checks', function (req, res) {
  cloudinary.uploader.upload('./server/node.png', function (result) {
    return result;
  }).then(function (photo) {
    var twenty = req.body.amount * .2;
    var thirty = req.body.amount * .3;
    var fifty = req.body.amount * .5;
    var checkid = 20;
    knex.insert({
      amount: req.body.amount,
      datedeposited: new Date(),
      description: req.body.description,
      picture: photo.url,
      reoccuring: req.body.reoccuring,
      active: true,
      deleted: false
    }).into('checks').then(function (id) {
      return id;
    }).then(function (id) {
      return knex('checks').select('id').then(function (id) {
        var currentId = 0;
        for (var i = 0; i < id.length; i++) {
          if (currentId < id[i].id) {
            currentId = id[i].id;
          }
        }
        return currentId;
      });
    }).then(function (id) {
      knex.insert({
        checkid: id,
        twenty: twenty,
        thirty: thirty,
        fifty: fifty
      }).into('checkterm').then(function (id) {
        return res.status(201).json({});
      });
    });
  }).catch(function (e) {
    console.error(e);
    res.sendStatus(500);
  });
});

app.get('/checkterm', function (req, res) {
  knex('checkterm').select('id', 'twenty', 'thirty', 'fifty', 'checkid').then(function (id) {
    return res.status(200).json({ id: id });
  });
});

app.post('/checkterm', function (req, res) {
  knex.insert({
    checkid: req.body.checkid,
    twenty: req.body.twenty,
    thirty: req.body.thirty,
    fifty: req.body.fifty
  }).into('checkterm').then(function (id) {
    return res.status(201).json({ id: id });
  }).catch(function (e) {
    console.error(e);
    res.sendStatus(500);
  });
});

app.put('/checkterm', function (req, res) {
  knex('checkterm').where({
    id: req.body.id
  }).update({
    twenty: req.body.twenty,
    thirty: req.body.thirty,
    fifty: req.body.fifty
  }).then(function (id) {
    return res.json({ id: id });
  }).catch(function (e) {
    console.error(e);
  });
});

app.get('/termtransactions', function (req, res) {
  knex('termtransactions').select('id', 'checktermid', 'transactiondate', 'account', 'transaction', 'description', 'photo').then(function (id) {
    return res.status(200).json({ id: id });
  });
});

app.post('/termtransactions', function (req, res) {
  console.log(req.body.transaction, req.body.checktermid);
  knex.insert({
    checktermid: req.body.checktermid,
    account: req.body.account,
    transactiondate: new Date(),
    transaction: req.body.transaction,
    description: req.body.description,
    photo: req.body.photo
  }).into('termtransactions').then(function (id) {
    return knex('checkterm').where({ id: req.body.checktermid }).select('twenty', 'thirty', 'fifty').then(function (id) {
      return id;
    });
  }).then(function (id) {
    var accounts = {
      twenty: id[0].twenty,
      thirty: id[0].thirty,
      fifty: id[0].fifty
    };
    var newBal = accounts[req.body.account] - req.body.transaction;
    knex('checkterm').where({
      id: req.body.checktermid
    }).update(_defineProperty({}, req.body.account, newBal)).then(function (id) {
      return id;
    });
  }).then(function (id) {
    return res.status(201).json({ id: id });
  }).catch(function (e) {
    console.error(e);
    res.sendStatus(500);
  });
});

app.delete('/termtransactions', function (req, res) {
  knex('termtransactions').where({
    id: req.body.id
  }).del().then(function (id) {
    return res.json({ id: id });
  }).catch(function (e) {
    console.error(e);
    res.sendStatus(500);
  });
});

function runServer() {
  return new Promise(function (resolve, reject) {
    app.listen(PORT, HOST, function (err) {
      if (err) {
        console.error(err);
        reject(err);
      }

      var host = HOST || 'localhost';
      console.log('Listening on ' + host + ':' + PORT);
    });
  });
}

if (require.main === module) {
  runServer();
}
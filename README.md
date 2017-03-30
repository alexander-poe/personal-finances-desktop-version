


## DB STRUCTURE
  ```sql
  CREATE TABLE Checks (
      ID serial primary key,
      Amount int,
      DateDeposited DATE,
      Description varchar(255),
      Picture varchar(255),
      Reoccuring BOOLEAN
  );

  CREATE TABLE CheckTerm (
      ID serial primary key,
      CheckID int references CHECKS(ID),
      Twenty int,
      Thirty int,
      Fifty int
  );

  CREATE TABLE TermTransactions (
      ID serial primary key,
      CheckTermID int references CheckTerm(ID),
      TransactionDate DATE,
      Account varchar (255),
      Transaction int,
      Description varchar(255),
      Photo varchar(255)
  );
```

1. Check

    1. User adds payment
      1. Amount
      2. Picture
      3. Description
      3. Reoccuring (true / false)
    2. Generated Automatically
      1. ID
      2. Date Deposited

2. CheckTerm

  1. For the current status of check amount
  2. Check is added computer calculates
      1. 20% of initial check
      2. 30% of initial check
      3. 50% of initial check


3. Transactions

  1. Adjustment is made to (Twenty / Thirty / Fifty)

    1. User adds transaction
        1. Amount
        2. Description
        3. Photo
        4. Account => 20 / 30 / 50
    2. Generated Automatically
        1. ID
        2. CheckTermID  

## Routes

1. Check
    1. User adds check
    2. User deletes check

2. CheckTerm
    1. Computer adds term
    2. Computer modifies when user inputs transaction
    3. Computer fetches CheckTerm

3. Transactions
    1. User adds transaction
    2. User fetches transactions
    3. User deletes transactions

## TODO (feature based)   

1. Photo on check

2. User adds transaction
    1. Transaction is posted to DB [x]
    2. get checkterm amount [x]
    3. subtract transaction from appropriate [x] checkterm ammount and modify the checkterm. [x]

3. Input error handling   

## Report Feature

```

Period | Total Income | Total Spent | Total Saved
------------- | -------------  |
March         | 3000.00 | 1200.00 | 2800.00

TransactionID| Amount | Description | Photo
------------- | -------------  |
122  | 30.00 | Groceries | Photo
123  | 20.00 | Gas | Photo
124  | 100.00 | Insurance | Photo


Twenty | Thirty| Fifty | Remaining
------------- | -------------  |
600.00       | 54.23 | 100.10 | 754.23

```


## Directory layout

```
.
├── client      Client-side code
│   ├── assets  Images, videos, etc.
│   ├── js      JavaScript
│   └── scss    SASS stylesheets
├── server      Server-side code
└── test        Tests
    ├── client  Client tests
    └── server  Server tests
```

## Deployment

Requires the [Heroku CLI client](https://devcenter.heroku.com/articles/heroku-command-line).

### Setting up the project on Heroku

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Create the Heroku app: `heroku create PROJECT_NAME`
* Instruct Heroku to install the development dependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`

### Deploying to Heroku

* Push your code to Heroku: `git push heroku master`

## Continuous Integration

* Add your repository to [Travis CI](https://travis-ci.org/)

## Continuous Deployment

Requires the [Travis CLI client](https://github.com/travis-ci/travis.rb).

### Setting up CD

* Add the following configuration to `.travis.yml`:

    ```
    deploy:
      provider: heroku
      app: YOUR_HEROKU_APP_NAME
    ```
* Add your Heroku API key: `travis encrypt $(heroku auth:token) --add deploy.api_key`

### Deploying using CD

* Push your code to GitHub: `git push origin master`

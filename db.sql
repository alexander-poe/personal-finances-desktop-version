CREATE TABLE Checks (
    ID serial primary key,
    Amount int,
    DateDeposited DATE,
    Description varchar(255),
    Picture varchar(255),
    Reoccuring Boolean,
    Active Boolean,
    Deleted Boolean
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

SELECT * FROM "checkterm"
inner JOIN "checks"
ON "checkterm" . "checkid" = "checks" . "id"

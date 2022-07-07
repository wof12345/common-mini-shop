import { createPool } from "mysql2";

// import express from "express";

// const app = express();

const createConnection = createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  connectionLimit: 10,
  database: "world",
});

export const getAllUserData = function (req, response) {
  let data;
  console.log("Requested all data");

  createConnection.query(`select * from users`, function (err, res) {
    if (err) throw err;
    data = res;

    response.json(data);
  });
};

export const getAllProductData = function (req, response) {
  let data;
  console.log("Requested all data");

  createConnection.query(`select * from product`, function (err, res) {
    if (err) throw err;
    data = res;

    response.json(data);
  });
};

export const getSpecificData = function (req, response) {
  let data = req.body;
  console.log(data);

  createConnection.query(
    `select * from customusertable where (Role = '${data[0]}' ${data[1]})`,
    function (err, res) {
      if (err) throw err;
      data = res;

      response.json(data);
    }
  );
};

export const insertdata = (req, response) => {
  let data = req.body;
  let msg = "";
  console.log(data);

  createConnection.query(
    `INSERT INTO users (user, userpass, userbd, usermobno) VALUES ('${data.username}', '${data.password}', '${data.birthdate}', '${data.mobile_no}')`,
    function (err, res) {
      if (err) {
        msg = err;
        response.json(msg);
        return console.log(err);
      }

      msg = res;
      response.json(msg);
      return console.log("Data insertion success.");
    }
  );
};

export const updateSpecData = (req, response) => {
  let data = req.body;
  let msg = "";
  console.log("data", data);

  createConnection.query(
    ` UPDATE product SET ${data[0]} WHERE Name = '${data[1]}'`,
    function (err, res) {
      if (err) {
        msg = err;
        response.json(msg);
        return console.log(err);
      }

      msg = res;
      response.json(msg);
      return console.log("Data insertion success.");
    }
  );
};

export const deleteSpecData = (req, response) => {
  let data = req.body;
  let msg = "";
  console.log(data);

  createConnection.query(
    `DELETE FROM customusertable WHERE UserNo = '${data[0]}'`,
    function (err, res) {
      if (err) {
        msg = err;
        response.json(msg);
        return console.log(err);
      }

      msg = res;
      response.json(msg);
      return console.log("Data insertion success.");
    }
  );
};

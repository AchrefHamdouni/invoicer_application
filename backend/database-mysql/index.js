var mysql = require("mysql");
var mysqlConfig = require("./config.js");
const bcrypt = require("bcrypt");

var connection = mysql.createConnection(mysqlConfig);
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to" + mysqlConfig.database);
  }
});

module.exports = {
  //users
  // getUserByUsername: (username,callback) => {
  //   const query = "SELECT * FROM user WHERE username = ?";
  //   connection.query(query, [username], (error, results, fields) => {
  //     if (error) {
  //       return callback(error);
  //     }

  //     if (results.length === 0) {
  //       return callback(null, null);
  //     }

  //     const user = {
  //       id: results[0].id,
  //       username: results[0].username,
  //       password: results[0].password,
  //     };

  //     return callback(null, user);
  //   });
  // },

  //clients
  getAllClients: (cb) => {
    connection.query("SELECT * FROM client;", function (error, result, fields) {
      cb(error, result);
    });
  },

  addClient: (arr, cb) => {
    connection.query(
      `INSERT INTO client (name_client, mf_client, adress_client, mobile_client)
      VALUES (?,?,?,?);`,
      arr,
      function (error, result, fields) {
        cb(error, result);
      }
    );
  },

  getClient: (arr, cb) => {
    connection.query(
      "SELECT * FROM client where name=?",
      arr,
      function (error, result, fields) {
        console.log(arr);
        cb(error, result);
      }
    );
  },
  updateClient: (arr, cb) => {
    connection.query(
      "UPDATE client SET name_client = ?, mf_client = ?, adress_client = ?, mobile_client = ? WHERE id_client = ?",
      arr,
      function (error, result, fields) {
        console.log(arr);
        cb(error, result);
      }
    );
  },


  deleteClient: (arr, cb) => {
    connection.query(
      "DELETE FROM client where id_client=?",
      arr,
      function (error, result, fields) {
        console.log(arr);
        cb(error, result);
      }
    );
  },
  //invoices
  getAllInvoices: (cb) => {
    connection.query(
      "SELECT invoice.id_invoice,invoice.ref_invoice, invoice.date_invoice, client.name_client,invoice.amount_invoice  FROM invoice JOIN client ON invoice.id_client = client.id_client JOIN detailinvoice ON invoice.id_invoice = detailinvoice.id_invoice GROUP BY invoice.id_invoice;",
      function (error, result, fields) {
        cb(error, result);
      }
    );
  },

  getInvoice: (arr, cb) => {
    connection.query(
      "SELECT * FROM invoice where id_invoice=?",
      arr,
      function (error, result, fields) {
        console.log(arr);
        cb(error, result);
      }
    );
  },
  deleteInvoice: (arr, cb) => {
    connection.query(
      "DELETE FROM invoice where id_invoice=?",
      arr,
      function (error, result, fields) {
        console.log(arr);
        cb(error, result);
      }
    );
  },
  // invoice

  addInvoice: (invoice, details, cb) => {
    // First,we insert the invoice into the 'invoice' table
    connection.query(
      `INSERT INTO invoice (id_invoice,ref_invoice, date_invoice, id_client,amount_invoice)
     VALUES (?, ?, ?,?, ?);`,
      [
        invoice.id_invoice,
        invoice.ref_invoice,
        invoice.date_invoice,
        invoice.id_client,
        invoice.amount_invoice,
      ],
      function (error, result, fields) {
        if (error) return cb(error, null);

        // If the invoice was inserted successfully, insert the details into the 'detailinvoice' table
        const values = details.map((d) => [
          result.insertId,
          d.product_name,
          d.product_unit,
          d.product_qty,
          d.product_price,
          d.product_amount,
          d.product_tva,
        ]);
        connection.query(
          `INSERT INTO detailinvoice (id_invoice,product_name,
          product_unit,
          product_qty,
          product_price,
          product_amount,
          product_tva )
         VALUES ?;`,
          [values],
          function (error, result, fields) {
            cb(error, result);
          }
        );
      }
    );
  },
};

// Make sure to call db.query() after the connection is established
connection.query("SELECT * FROM client", (err, result) => {
  if (err) throw err;
  console.log(result);
});

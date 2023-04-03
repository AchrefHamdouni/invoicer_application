const express = require('express');
const db = require('../database-mysql');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const secret = process.env.JWT_SECRET || 'default-secret';



app.use(express.json());
app.use(cors());
//users
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await db.getUserByUsername(username);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }


//     const token = jwt.sign({ username: user.username }, secret);

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//Clients

app.get('/client/:name',  (req, res)=> {

  db.getClient(req.params.name_client,(error,result)=>{
    
    if(error) {res.send("notFound")}
    else {res.send(result)}
})
}); 
  
app.get('/clients',  (req, res)=> {
    db.getAllClients((error,result)=>{
      if(error) {throw error}
      else {res.send(result)}
 })
}); 


app.post('/client',  (req, res)=> {
  db.addClient([req.body.name_client,req.body.mf_client,req.body.adress_client,req.body.mobile_client],(error,result)=>{
    if(error) {throw error}
    else {res.send(result)}
})
});

app.put('/client/:id_client', (req, res) => {
  const { id_client } = req.params;
  const { name_client, mf_client, adress_client, mobile_client } = req.body;
  
  db.updateClient([name_client, mf_client, adress_client, mobile_client,id_client], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating client');
    } else {
      res.send(result);
    }
  });
});



app.delete('/client/:id_client',  (req, res)=> {
  db.deleteClient(req.params.id_client,(error,result)=>{
    if(error) {throw error}
    else {res.send(result)}
})
});

//invoices
app.post('/invoice', (req, res) => {
  const invoice = {
    id_invoice: req.body.id_invoice,
    ref_invoice:req.body.ref_invoice,
    date_invoice: req.body.date_invoice,
    id_client: req.body.id_client,
    amount_invoice:req.body.amount_invoice
  };
  const details = req.body.details || [];

  db.addInvoice(invoice, details, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding invoice');
      console.log(error)
    } else {
      res.send(result);
    }
  });
});

app.get('/invoices',  (req, res)=> {
  db.getAllInvoices((error,result)=>{
    if(error) {throw error}
    else {res.send(result)}
})
}); 



app.listen(3000, () =>{
  console.log('listening on port 3000!');
});


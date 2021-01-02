import express from 'express';
import bodyParser from 'body-parser'
import EthManager from "./src/centerpirme.js";
import cors from 'cors';


var ethManager = new EthManager("https://ropsten.infura.io/v3/1ebda450682b4897920d8a721a289303");
const app = express(),
      port = 3080;

// place holder for the data
const users = [];
app.use(cors())
app.use(bodyParser.json());

app.post('/api/createWallet', (req, res) => {
  const password = req.body.password;
  let wallet = ethManager.createAccount(password)
  res.json(wallet);
});


app.post('/api/importWallet', (req, res) => {
  try {
    const password = req.body.password;
    const keystore = req.body.keystore;
    let wallet = ethManager.importWalletByKeystore(keystore,password)
    console.log(wallet);
    res.json(wallet);
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});

app.post('/api/etherBalance', async function(req,res) {
  try {
    const address = req.body.address;
    let balance = await ethManager.getEtherBalance(address)
    console.log(balance);
    res.json(balance);
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});

app.post('/api/tokenBalance', async function(req,res) {
  try {
    const address = req.body.address;
    const tokenContractAddress = req.body.tokenAddress;
    let balance = await ethManager.getERCTokenBalance(tokenContractAddress,address)
    console.log(balance);
    res.json(balance);
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});


app.post('/api/sendEther', async function(req,res) {
  try {
    const keystore = req.body.keystore;
    const password = req.body.password;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    let balance = await ethManager.sendEther(keystore,password,toAddress,amount,3)
    console.log(balance);
    res.json(balance);
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});

app.post('/api/sendToken', async function(req,res) {
  try {
    const keystore = req.body.keystore;
    const password = req.body.password;
    const tokenContractAddress = req.body.tokenContractAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    let balance = await ethManager.sendToken(keystore,password,tokenContractAddress,toAddress,parseFloat(amount),3)
    console.log(balance);
    res.json(balance);
  } catch(e) {
     return res.status(401).send({
      message : e.message
   });
  }
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
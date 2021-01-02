# Ethereum NodeJS SDK

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [API](#api)
    - [Create Wallet](#createwallet)
    - [Import Wallet](#importwallet)
      - [Keystore](#keystore)
      - [Private Key](#keystore)
    - [Balance](#balance)
      - [Ether Balance](#etherbalance)
      - [ERC20 Token Balance](#erc20tokenbalance)
    - [Send](#send)
      - [Send Ether](#sendether)
      - [Send ERC20 Token](#senderc20token)
  - [Demo](#demo)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/centerprime/Node-Ethereum-SDK.git
```

To install and set up the library, run:

```sh
$ npm install node-ethereum-sdk
```

## API

### Create Wallet

```js
import EthManager from "../src/centerprime.js";

var ethManager = new EthManager("Infura Url");
ethManager.createAccount("12345")
  .then(res => {
     console.log(res);
  });
```


### Import Wallet by Keystore

```js
import EthManager from "../src/centerprime.js";

var ethManager = new EthManager("Infura Url");
let keystore = {};
let password = '';
ethManager.importWalletByKeystore(keystore,password)
  .then(res => {
      console.log(res);
    });
```

### Import Wallet by Private key

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let privateKey = '';
ethManager.importWalletByPrivateKey(privateKey)
  .then(res => {
        console.log(res);
      });
```

### Get Ether balance

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let address = '';
ethManager.getEtherBalance(address)
  .then(res => {
          console.log(res);
        });
```


### Get ERC20 token balance

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let tokenContractAddress = '';
let address = '';
ethManager.getERCTokenBalance(tokenContractAddress, address)
  .then(res => {
            console.log(res);
        });
```

### Send ERC20 token

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let keystore = {};
let password = '';
let tokenContractAddress = '';
let toAddress = '';
let amount = '';
let chainId = ''; // 1 : Mainnet 3 : Ropsten
ethManager.sendToken(keystore, password, tokenContractAddress , toAddress , amount , chainId)
  .then(res => {
            console.log(res);
        });
```


### Send Ether

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let keystore = {};
let password = '';
let toAddress = '';
let amount = '';
let chainId = ''; // 1 : Mainnet 3 : Ropsten
ethManager.sendEther(keystore, password , toAddress , amount , chainId)
  .then(res => {
            console.log(res);
        });
```



### Demo

First run backend 

```js
   npm install
   npm start
```

Second run frontend /frontend/ 

```js
   npm install
   npm start
```
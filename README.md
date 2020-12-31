# Center Prime Node Ethereum SDK

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
      - [Options](#options)
    - [Import Wallet](#importwallet)
      - [Keystore](#keystore)
      - [Private Key](#keystore)
    - [Balance](#balance)
      - [Ether Balance](#etherbalance)
      - [ERC20 Token Balance](#erc20tokenbalance)
    - [Send](#send)
      - [Send Ether](#sendether)
      - [Send ERC20 Token](#senderc20token)

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
ethManager.createAccount("12345");
```


### Import Wallet by Keystore

```js
import EthManager from "../src/centerprime.js";

var ethManager = new EthManager("Infura Url");
let keystore = {};
let password = '';
ethManager.importWalletByKeystore(keystore,password);
```

### Import Wallet by Private key

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let privateKey = '';
ethManager.importWalletByPrivateKey(privateKey);
```

### Get Ether balance

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let address = '';
ethManager.getEtherBalance(address);
```


### Get ERC20 token balance

```js
import EthManager from "../src/centerprimeSDK.js";

var ethManager = new EthManager("Infura Url");
let tokenContractAddress = '';
let address = '';
ethManager.getERCTokenBalance(tokenContractAddress, address);
```

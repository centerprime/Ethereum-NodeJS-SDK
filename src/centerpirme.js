import Web3 from 'web3';
import fs from 'fs';

class EthManager {
    constructor(infuraUrl) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    }

    createAccount(password) {
        let account = this.web3.eth.accounts.create(password);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(password);
        var myJSON = JSON.stringify(keystore);
        console.log({
            account: account,
            wallet: wallet,
            keystore: keystore,
            keystoreJson: myJSON
        });
        console.log(myJSON);
    
    }
    
    // createAccount("12345");
    
    importWalletByKeystore(keystore, password) {
        let account = this.web3.eth.accounts.decrypt(keystore, password,false);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        console.log("KEYSTORE IMPORT");
        console.log({
            account: account,
            wallet: wallet,
            keystore: keystore,
        });
    }
    
    
    importWalletByPrivateKey(privateKey) {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(this.web3.utils.randomHex(32));
        console.log("PRIVATE_KEY IMPORT");
        console.log({
            account: account,
            wallet: wallet,
            keystore: keystore,
        });
    }
    
    // getERCTokenBalance();
    async getERCTokenBalance(tokenAddress , address) {
        // ABI to transfer ERC20 Token
        let abi = JSON.parse(fs.readFileSync('erc20ABI.json', 'utf-8'));
        // Get ERC20 Token contract instance
        let contract = new this.web3.eth.Contract(abi, tokenAddress);
        // Get decimal
        let decimal = await contract.methods.decimals().call();
        console.log(decimal);
        // Get Balance
        let balance = await contract.methods.balanceOf(address).call();
        console.log(`Balance: ${balance / Math.pow(10,decimal)}`);
       
    }
    

    async sendToken() {
        const privateKey = "0x..";
        const tokenAddress = "0x..";
        const fromAddress = "0x..";
        const toAddress = "0x..";
        // ABI to transfer ERC20 Token
        let abi = JSON.parse(fs.readFileSync('erc20ABI.json', 'utf-8'));
        // calculate ERC20 token amount
        let amount = 1;
        let tokenAmount = this.web3.utils.toWei(amount.toString(), 'ether')
        // Get ERC20 Token contract instance
        let contract = new this.web3.eth.Contract(abi, tokenAddress, {
            from: fromAddress
        });
        // How many tokens do I have before sending?
        let balance = await contract.methods.balanceOf(fromAddress).call();
        console.log(`Balance before send: ${balance}`);
        // EIP 155 - List of Chain ID's:
        const chainList = {
            mainnet: 1,
            morden: 2,
            ropsten: 3,
            rinkeby: 4,
            ubiqMainnet: 8,
            ubiqTestnet: 9,
            rootstockMainnet: 30,
            rootstockTestnet: 31,
            kovan: 42,
            ethereumClassicMainnet: 61,
            ethereumClassicTestnet: 62,
            ewasmTestnet: 66,
            gethPrivateChains: 1337
        };
        // The gas price is determined by the last few blocks median gas price.
        const avgGasPrice = await this.web3.eth.getGasPrice();
        // current transaction gas prices from https://ethgasstation.info/
        const currentGasPrices = avgGasPrice;
        /**
         * With every new transaction you send using a specific wallet address,
         * you need to increase a nonce which is tied to the sender wallet.
         */
        let nonce = await this.web3.eth.getTransactionCount(fromAddress);
        // Will call estimate the gas a method execution will take when executed in the EVM without.
        let estimateGas = this.web3.eth.estimateGas({
            "value": '0x0', // Only tokens
            "data": contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
            "from": fromAddress,
            "to": toAddress
        });
        console.log({
            estimateGas: estimateGas
        });
        // Build a new transaction object.
        const transaction = {
            "value": '0x0', // Only tokens
            "data": contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
            "from": fromAddress,
            "to": toAddress,
            "gas": web3.utils.toHex(estimateGas * 1.10),
            "gasLimit": web3.utils.toHex(estimateGas * 1.10),
            "gasPrice": web3.utils.toHex(Math.trunc(currentGasPrices.medium * 1e9)),
            "chainId": web3.utils.toHex(chainList.mainnet)
        };
        // Creates an account object from a private key.
        const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
        /**
         * This is where the transaction is authorized on your behalf.
         * The private key is what unlocks your wallet.
         */
        const signedTransaction = senderAccount.signTransaction(transaction);
        console.log({
            transaction: transaction,
            amount: amount,
            tokenAmount: tokenAmount,
            avgGasPrice: avgGasPrice,
            signedTransaction: signedTransaction
        });
    
        try {
            const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    
            console.log({
                receipt: receipt
            });
    
        } catch (error) {
            console.log({
                error: error.message
            });
        }
    }
    
}


// const singletonInstance = new EthManager();

// Object.freeze(singletonInstance);

export default EthManager;
import Web3 from 'web3';
import contract from 'truffle-contract';

// let web3;

export default {
  init() {
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   // set the provider you want from Web3.providers
    //   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    // }
    const provider = new Web3.providers.HttpProvider("http://localhost:9545");
    const MyContract = contract();
    MyContract.setProvider(provider);

  }

}


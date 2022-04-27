// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; //choosing solidity version

contract Transactions {
  uint256 transactionCount; //transactionCount is a variable thats gg to hold the # of transactions, of type uint256

  event Transfer(
    address from,
    address receiver,
    uint256 amount,
    string message,
    uint256 timestamp,
    string keyword
  ); //event - think of this like a function that we're going to emit or call later on. this function is gg to accept a few param. Each one of our trans
  //address-type, from-variable name, uint-type amount-variable  || event will have to be emitted from somewhere (ltr)

  struct TransferStruct {
    //similar to an object but we're not actly declaring an obj here. just specifying what properties this object have and of what type are they going to be
    address sender; //address-type sender-name of property
    address receiver;
    uint256 amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  //can also define an array of different transactions, bc we wanna store all of them
  //to define our array, we can call it, eg transactions, but have to define what type of trans are these gna be
  TransferStruct[] transactions; //this means - our transactions variable is going to be an array of transfer structures || an array of objects

  //create different functions:
  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {         //'message' is some specific data stored in the memory of that transaction
    //just doing some actions, main part of our smart contract
    transactionCount += 1;

    //pushing a transaction into the transactions array:  (but not making transf yet)
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));          //call transactions array, and .push() method on it - similar to JS || what do we want to push? TransferStruc
    //need to pass in all the params that our TransferStruc needs. - we actly alr have the sender in the object called msg; receiver amount & message is jst cmg thru our params; block.timestamp is the timestamp of this specific block; 
    //* https://docs.soliditylang.org/en/latest/units-and-global-variables.html#block-and-transaction-properties

    //line 38 is not transfering amount or doing anything bc we have not emitted the transfer event. To emit...
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    //get it from memory
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}
// 0x7fca18d01179c7447af44cb6291a8743e68c6079
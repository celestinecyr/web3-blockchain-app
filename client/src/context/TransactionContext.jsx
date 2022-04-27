//1:30:00 - 
//write logics here, instead of writing it in all components
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants'

//create react context
export const TransactionContext = React.createContext();

//since we're using metamask, we're getting access to the ethereum object which we can type by typing:
//*MetaMask injects a global API into websites visited by its users at window.ethereum. This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions. The presence of the provider object indicates an Ethereum user. 
const { ethereum } = window;                                          //basically destructuring ethereum object --> window.ethereum object

//create a function that is going to fetch the ethereum contract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer)
  //contractAddress - we get this after deploying contract
  //contractABI - from Transactions.json
  //signer - 
  //console.log({ provider, signer, transactionsContract });
  return transactionsContract;                                           //now, we're able to use this variable to call all of our contract related functions
};

//Context Provider:
//we have to create our context --> because we have to have a specific place where its going to serve its purpose. ( to call getEthereumContract() )
export const TransactionProvider = ({ children }) => {                  //every context provider has to get one prop - children --> why?
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo:'', amount:'', keyword:'', message:''});       //refer to Welcome.jsx line 84-87
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));                                        //will be reset everytime we reload our browser, but we're gg to store our transaction count into local storage
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const getAllTransactions = async  () =>{
    try {
      if (!ethereum) return alert('Please install Metamask!');
      const transactionsContract = getEthereumContract();   
      const availableTransactions = await transactionsContract.getAllTransactions();

      // restructure the keyvariables
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),        //date representation
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));

      setTransactions(structuredTransactions);
      console.log(availableTransactions);
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask!');
      const accounts = await ethereum.request({method: 'eth_accounts'});
  
      if(accounts.length) {
        setCurrentAccount(accounts[0]);
        
        getAllTransactions();        //get All trnasactions
      } else{
        console.log('No accounts found.');
      }
      console.log(accounts);
    } catch (error) {
      //if inside catch means theres no eth object
      throw new Error("No ethereum object");
    }
  }

  const checkIfTransactionExist = async () => {
    try {
      const transactionsContract = getEthereumContract();                                   //getEthereumContract();
      const transactionsCount = await transactionsContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount)
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }
  
  const connectWallet = async () => {
    try{
      if (!ethereum) return alert('Please install Metamask!');
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});

      setCurrentAccount(accounts[0]);     //for?
      window.location.reload();
    } catch(error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  }

  const sendTransaction = async () => {
    try {
      //check if the person has Metamask installed
      if (!ethereum) return alert('Please install Metamask!');
      
      const { addressTo, amount, keyword, message } = formData;     //get data from the form (our form is in the Welcome component)
      const transactionsContract = getEthereumContract();            //getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);         //parse decimal into gwei hex

      //sending ethereum from one address to another
      await ethereum.request({    
        method: 'eth_sendTransaction',
        params: [{                                                  //array with object
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',                                            // 21000 GWEI | amount of gas we want our transaction to take / spend | all values written in eth are in hexadecimal
          value: parsedAmount._hex,                                 //0.0001 --> need to convert amount into GWEI
        }]
      });

      //call addToBlockChain function to store the transaction that just happened
      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);       //takes time for trans to go thru, so we also have loading state

      setIsLoading(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();                                 //this is going to wait for the transaction to be finished
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionsCount = await transactionsContract.getTransactionCount();

      setTransactionCount(transactionsCount.toNumber());
     
      window.reload();            //reload the page when transaction is done
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, [])

  return(
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading}}>     
    {/* whatever we wrap inside the transaction provider is going to be rendered and have access to this value object*/}
        {children}
    </TransactionContext.Provider>
  );
}
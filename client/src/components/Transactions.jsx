import React, {useContext} from 'react';

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';
import { shortenAddress } from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });      //here we pass in an object {} containing keyword

  return (
    <div className='bg-[#181918] m-4 flex flex-1
      flex-col p-3 rounded-md hover:shadow-2xl
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]'//providing diff widths for diff device sizes
    >
      
      {/*Content*/}
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='w-full mb-6 p-2'>
          {/* <a href="https://ropsten.etherscan.io/address/${addressFrom}"></a> --> MAKE IT A DYNAMIC TEMPLATE STRING:*/}
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopner nolistener">
            <p className='text-white text-base'>From: {shortenAddress(addressFrom)}</p>
          </a>

          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopner nolistener">
          <p className='text-white text-base'>To: {shortenAddress(addressTo)}</p>
          </a>

          <p className='text-white text-base'>Amount: {amount} ETH</p>
          {message && (
            <>
              <br/>
              <p className='text-white text-base'>Message: {message}</p>
            </>
          )}
        </div>
        {/* render image/gif here */}
        <img
          src={gifUrl || url}
          alt="gif"
          className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover'
        />
        <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
          <p className='text-[#37c7da] font-bold'>{timestamp}</p>
        </div>
        
      </div>

    </div>
  )
}

const Transactions = () => {
  const {currentAccount, transactions} = useContext(TransactionContext);

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        {/* currrentAccount ? (If there is a currentAccount show latest trans), : (else, connect your account to see the latest transactions)... */}
        {currentAccount ? (     
          <h3 className='text-white text-center my-2'>Latest transactions</h3>
        ) : (
          <h3 className='text-white text-center my-2'>Please connect your account to view the latest transactions</h3>
        )}
        
        {/* Loop through the transactions */}
        <div className='flex flex-wrap justify-center items-center mt-10'>
          {/* Create dynamic block in here */}
          {transactions.reverse().map((transaction,i) => (
            <TransactionCard key={i} {...transaction}>     
            {/* spread all the properties we have for transaction; taking all properties from line 24 transaction, and put into line 25 TransactionCard as props*/}
            </TransactionCard>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Transactions;
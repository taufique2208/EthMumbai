'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { useAccount } from 'wagmi';
import { useContext , useState} from 'react';
import {TestEvaluationContext} from '../../Context/TestEvaluation.jsx';
import { TestEvaluationAddress,TestEvaluationAbi } from '~~/Context/constants.js';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';

// import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { ChangeEvent } from 'react';

const AdminPage = () => {
  const [questionId, setQuestionId] = useState('');
  const [questionOptions, setQuestionOptions] = useState(['']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');

  const handleChangeQuestionId = (event) => {
      setQuestionId(event.target.value);
  }
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "addQuestion",
    args: [questionId, questionOptions, correctAnswerIndex],
    // contractAddress: TestEvaluationAddress,
    // contractAbi: TestEvaluationAbi,
    // signer: "0x115Fa80d1D00C38D88D2c024fe5C6f9d5ca34bE3",
    blockConfirmations: 1,
  onBlockConfirmation: txnReceipt => {
    console.log("Transaction blockHash", txnReceipt);
  },

})

  const handleChangeQuestionOptions = (event) => {
    const inputValue = event.target.value;
    const optionsArray = inputValue.split(',');

    // Remove any empty strings from the array
    const filteredOptionsArray = optionsArray;

    setQuestionOptions(filteredOptionsArray);
};
  
  const handleChangeCorrectAnswerIndex = (event) => {
      setCorrectAnswerIndex(event.target.value);
  };
  
  const { addQuestion } = useContext(TestEvaluationContext);
  const router = useRouter();
  const { address: connectedAddress } = useAccount();
  console.log("Connected Address:", connectedAddress)

  const submitQuestion =async (e)=>{
    e.preventDefault();
    writeAsync()
  }

  // const handleTakeTestClick = () => {
  //   router.push('/admin'); // Navigate to the student screen
  // };
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-3xl font-bold">Admin</span>
        </h1>
        {/* <input></input>
         */}
          <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Question Form</h1>
        <form action="#" method="post" className="max-w-md bg-white p-6 rounded-md shadow-md" onSubmit={submitQuestion}>
        <div className="mb-4">
                    <label htmlFor="questionId" className="block text-sm font-medium text-gray-700">Question ID</label>
                    <input type="text" id="questionId" value={questionId} onChange={handleChangeQuestionId} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                    <label htmlFor="questionOptions" className="block text-sm font-medium text-gray-700">Question Options (comma-separated)</label>
                    <input type="text" id="questionOptions"  onChange={handleChangeQuestionOptions} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                    <label htmlFor="correctAnswerIndex" className="block text-sm font-medium text-gray-700">Correct Answer Index</label>
                    <input type="number" id="correctAnswerIndex" value={correctAnswerIndex} onChange={handleChangeCorrectAnswerIndex} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition">Submit</button>
                </div>
            </form>

    </div>
        
        <div className="grid place-items: center"> {/* Added container with centering */}
        
        </div>
      </div>
    </div>
  )
};

export default AdminPage;
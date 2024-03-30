// Import necessary modules from Next.js
'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
// import { useAccount } from "wagmi";

// INTERNAL IMPORT
import { TestEvaluationABI, TestEvaluationAddress } from './constants';

// Function to fetch contract instance
// const fetchContract = (signerOrProvider) =>
//   new ethers.Contract(TestEvaluationAddress, TestEvaluationABI, signerOrProvider);

export const TestEvaluationContext = React.createContext();

export const TestEvaluationProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    // const { address: connectedAddress } = useAccount();
    // setCurrentAccount(connectedAddress);
    async function getContract() {
        // Connect to an Ethereum provider
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.public.zkevm-test.net");

        const contract = new ethers.Contract(TestEvaluationAddress, TestEvaluationABI, provider);

        return contract;
    }


    // Function to add a question to the contract
    const addQuestion = async (id, options, rightOptionIndex) => {
        const contract = await getContract();

        try {
            await contract.addQuestion(id, options, rightOptionIndex);
            console.log('Question added successfully.');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    // Function to submit user responses
    const submitResponse = async (responses) => {
        const contract = await getContract();
        try {
            // Convert responses object to an array of { questionId, optionIndex }
            const submittedData = Object.entries(responses).map(([questionId, optionId]) => {
                const optionIndex = Object.keys(math.find(item => item.question_id === parseInt(questionId)).options).findIndex(key => key === optionId);
                return {
                    questionId: parseInt(questionId),
                    optionIndex
                };
            });
    
            await contract.submitResponse(submittedData);
            console.log('Response submitted successfully.');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };
    

    // Function to retrieve user responses
    const getUserResponses = async () => {
        const contract = await getContract();
        try {

            return await contract.getUserResponses(currentAccount);
        } catch (error) {
            console.error('Error retrieving user responses:', error);
            return [];
        }
    };

    return (
        <TestEvaluationContext.Provider
            value={{
                // currentAccount,
                addQuestion,
                submitResponse,
                getUserResponses,
            }}
        >
            {children}
        </TestEvaluationContext.Provider>
    );
};

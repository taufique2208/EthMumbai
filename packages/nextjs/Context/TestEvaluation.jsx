import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { TestEvaluationABI, TestEvaluationAddress } from './constants';

// Function to fetch contract instance
const fetchContract = (signerOrProvider) => new ethers.Contract(TestEvaluationAddress, TestEvaluationABI, signerOrProvider);

export const TestEvaluationContext = React.createContext();

export const TestEvaluationProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [testEvaluationContract, setTestEvaluationContract] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setCurrentAccount(await signer.getAddress());
                setTestEvaluationContract(fetchContract(signer));
            } catch (error) {
                console.error("Error initializing TestEvaluation contract:", error);
            }
        };

        initialize();
    }, []);

    // Function to add a question to the contract
    const addQuestion = async (id, options, rightOptionIndex) => {
        try {
            await testEvaluationContract.addQuestion(id, options, rightOptionIndex);
            console.log("Question added successfully.");
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    // Function to submit user responses
    const submitResponse = async (responses) => {
        try {
            await testEvaluationContract.submitResponse(responses);
            console.log("Response submitted successfully.");
        } catch (error) {
            console.error("Error submitting response:", error);
        }
    };

    // Function to retrieve user responses
    const getUserResponses = async () => {
        try {
            return await testEvaluationContract.getUserResponses(currentAccount);
        } catch (error) {
            console.error("Error retrieving user responses:", error);
            return [];
        }
    };

    // Function to connect wallet
    const connectWallet = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            setCurrentAccount(await signer.getAddress());
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    return (
        <TestEvaluationContext.Provider
            value={{
                currentAccount,
                addQuestion,
                submitResponse,
                getUserResponses,
                connectWallet
            }}
        >
            {children}
        </TestEvaluationContext.Provider>
    );
};

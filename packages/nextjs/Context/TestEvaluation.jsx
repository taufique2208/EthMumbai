// Import necessary modules from Next.js
'use client';

import React, { useState,useEffect } from 'react';
import Web3 from 'web3';
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
// import { useAccount } from "wagmi";




// INTERNAL IMPORT
import { TestEvaluationABI, TestEvaluationAddress } from './constants';

export const TestEvaluationContext = React.createContext();

export const TestEvaluationProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [testEvaluationContract, setTestEvaluationContract] = useState(null);
    // const {address: currentAccountAddress} = useAccount();
    useEffect(() => {
      const initialize = async () => {
        // try {
        //   // Check if window.ethereum is available
        //   if (!window.ethereum) {
        //     console.error("Please install a compatible Ethereum wallet extension.");
        //     return;
        //   }
  
        //   // Create a new Web3 instance using window.ethereum
        //   const web3 = new Web3(window.ethereum);
  
        //   // Get the current account
        //   const accounts = await web3.eth.requestAccounts();
        //   setCurrentAccount(accounts[0]);
        //   console.log(accounts)
  
        //   // Create an instance of the contract
        //   const contract = new web3.eth.Contract(TestEvaluationABI, "0xca11bde05977b3631167028862be2a173976ca11");
        //   console.log(contract);
        //   setTestEvaluationContract(contract);
        // } catch (error) {
        //   console.error("Error initializing TestEvaluation contract:", error);
        // }
        useAutoConnect();
        const networkColor = useNetworkColor();
        const { targetNetwork } = useTargetNetwork();
        console.log("networkColor", networkColor);
        console.log("targetNetwork", targetNetwork);
      };
  
      initialize();
    }, []);
  
    // Function to add a question to the contract
    const addQuestion = async (id, options, rightOptionIndex) => {
        const { writeAsync, isLoading, isMining } = userScaffoldContractWrite({
            contractFunction: "addQuestion",
            contractFunctionArgs: [id, options, rightOptionIndex],
            contractAddress: TestEvaluationAddress,
            contractAbi: TestEvaluationABI,
            signer: "0x115Fa80d1D00C38D88D2c024fe5C6f9d5ca34bE3",

        })
        
    //   console.log('Adding question:', id, options, rightOptionIndex);
    //   try {
    //     if (!testEvaluationContract) {
    //       console.error("TestEvaluation contract is not initialized yet.");
    //       return;
    //     }
  
    //     await testEvaluationContract.methods.addQuestion(id, options, rightOptionIndex).send({ from: currentAccount });
    //     console.log('Question added successfully.');
    //   } catch (error) {
    //     console.error('Error adding question:', error);
    //   }
    };

    // Function to submit user responses
    const submitResponse = async (responses) => {
        try {
            const contract = new web3.eth.Contract(TestEvaluationABI, TestEvaluationAddress);
            // Implementation for submitting responses
            console.log('Response submitted successfully.');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    // Function to retrieve user responses
    const getUserResponses = async () => {
        try {
            const contract = new web3.eth.Contract(TestEvaluationABI, TestEvaluationAddress);
            // Implementation for retrieving user responses
            console.log('Retrieved user responses.');
        } catch (error) {
            console.error('Error retrieving user responses:', error);
        }
    };

    return (
        <TestEvaluationContext.Provider
            value={{
                currentAccount,
                addQuestion,
                submitResponse,
                getUserResponses,
            }}
        >
            {children}
        </TestEvaluationContext.Provider>
    );
};
// 'use client'

// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';

// // INTERNAL IMPORT
// import { TestEvaluationABI, TestEvaluationAddress } from './constants';

// export const TestEvaluationContext = React.createContext();

// export const TestEvaluationProvider = ({ children }) => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [testEvaluationContract, setTestEvaluationContract] = useState(null);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         // Check if window.ethereum is available
//         if (!window.ethereum) {
//           console.error("Please install a compatible Ethereum wallet extension.");
//           return;
//         }

//         // Create a new Web3 instance using window.ethereum
//         const web3 = new Web3(window.ethereum);

//         // Get the current account
//         const accounts = await web3.eth.requestAccounts();
//         setCurrentAccount(accounts[0]);

//         // Create a function to initialize the contract instance
//         const initializeContract = async () => {
//           const contract = new web3.eth.Contract(TestEvaluationABI, TestEvaluationAddress);
//           setTestEvaluationContract(contract);
//         };

//         // Initialize the contract instance
//         await initializeContract();
//       } catch (error) {
//         console.error("Error initializing TestEvaluation contract:", error);
//       }
//     };

//     initialize();
//   }, []);

//   // Function to add a question to the contract
//   const addQuestion = async (id, options, rightOptionIndex) => {
//     console.log('Adding question:', id, options, rightOptionIndex);
//     try {
//       if (!testEvaluationContract) {
//         console.error("TestEvaluation contract is not initialized yet.");
//         return;
//       }

//       await testEvaluationContract.methods.addQuestion(id, options, rightOptionIndex).send({ from: currentAccount });
//       console.log('Question added successfully.');
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   // Function to submit user responses
//   const submitResponse = async (responses) => {
//     try {
//       if (!testEvaluationContract) {
//         console.error("TestEvaluation contract is not initialized yet.");
//         return;
//       }

//       // Implementation for submitting responses
//       console.log('Response submitted successfully.');
//     } catch (error) {
//       console.error('Error submitting response:', error);
//     }
//   };

//   // Function to retrieve user responses
//   const getUserResponses = async () => {
//     try {
//       if (!testEvaluationContract) {
//         console.error("TestEvaluation contract is not initialized yet.");
//         return;
//       }

//       // Implementation for retrieving user responses
//       console.log('Retrieved user responses.');
//     } catch (error) {
//       console.error('Error retrieving user responses:', error);
//     }
//   };

//   return (
//     <TestEvaluationContext.Provider
//       value={{
//         currentAccount,
//         addQuestion,
//         submitResponse,
//         getUserResponses,
//       }}
//     >
//       {children}
//     </TestEvaluationContext.Provider>
//   );
// };

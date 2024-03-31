'use client'

import React, { useContext, useState,useEffect } from 'react';
import { math } from '../../mathtest.json';
import { useAccount } from "wagmi";
import { TestEvaluationContext } from '~~/Context/TestEvaluation';
import {useScaffoldContractWrite} from '~~/hooks/scaffold-eth';
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
// import { parseEther } from 'viem';
// import { parseEther } from 'ethers';




const MathTest = () => {
  
  const { address: connectedAddress } = useAccount();
  const [responses, setResponses] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  
  const responsesArray = Object.entries(responses).map(([questionId, optionId]) => ({
    questionId: parseInt(questionId),
    chosenOptionIndex: parseInt(optionId),
}));  
  console.log(responsesArray)
  const { writeAsync,isLoading, isMining  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "submitResponse",
    args: [responsesArray] ,// Pass in the responses array
    blockConfirmations: 1,
    // value: parseEther("0.1"),
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt);
      // Add any additional logic here after transaction confirmation
    },
  });

  const handleOptionChange = (questionId, optionId) => {
    setResponses({ ...responses, [questionId]: optionId });
  };

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

// the data that will be submitted in response
const handleSubmit = () => {
  console.log("this is response ", responses);
  // Check if the user has provided their address
  if (connectedAddress == undefined) {
      alert('Please provide your address.');
      return;
  }
  writeAsync();

  // Prepare the data to be submitted
  // const submittedData = Object.entries(responses).map(([questionId, optionId]) => {
  //     const questionData = math.find(item => item.question_id === parseInt(questionId));
  //     if (questionData) {
  //         const optionIndex = Object.keys(questionData.options).findIndex(key => key === optionId);
  //         return {
  //             questionId: parseInt(questionId),
  //             optionIndex,
  //             connectedAddress // Add the user's address
  //         };
  //     }
  //     return null;
  // }).filter(Boolean);

  // console.log('Submitted Data:', submittedData); // Add this line to log the submitted data

  // Pass responses to submitResponse instead of submittedData
  // submitResponse(responses);

  // // Do something with the submittedData, such as sending it to the server or processing it
  // console.log('Submitted Data:', submittedData);
};

// const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
//   contractName: "YourContract",
//   functionName: "submitResponse",
//   contractFunctionArgs: [responses],
//   contractAddress: "0x6Dc26ba4aec470149d0596B2DC9F5fC4213a9830",
// }); 


  // Function to split the math test content into individual tiles
  const splitIntoTiles = (mathTest) => {
    const tiles = [];
    let currentTileContent = [];
    let currentQuestionId = null;

    mathTest.forEach((item) => {
      const questionMatch = item.question.match(/Question (\d+)/);
      if (questionMatch) {
        const newQuestionId = parseInt(questionMatch[1], 10);
        if (currentQuestionId !== null && currentQuestionId !== newQuestionId) {
          // Push the current tile content to the tiles array
          tiles.push(renderTile(currentTileContent));
          currentTileContent = [];
        }
        currentQuestionId = newQuestionId;
      }
      currentTileContent.push(item);
    });

    // Push the last tile to tiles array
    if (currentTileContent.length) {
      tiles.push(renderTile(currentTileContent));
    }

    return tiles;
  };

  // Function to render a tile
  const renderTile = (tileContent) => {
    return (
      <div className="question-tile mb-8 p-4 " key={tileContent[0].question_id}> {/* Add padding to the question tile */}
        {tileContent.map((item) => (
          <React.Fragment key={item.question_id} >

            <div className='bg-pink-100 p-2 my-5 rounded-lg shadow-md' >
            <p className="font-medium">Question {item.question_id}</p>
            <p className="mb-2">{item.question}</p>
            <ul className="list-none p-0 mb-4">
              {Object.entries(item.options).map(([optionKey, optionValue]) => (
                <li key={optionKey} className="flex items-center mb-1">
                  <input
                    type="radio"
                    id={`option-${item.question_id}-${optionKey}`}
                    name={`question-${item.question_id}`}
                    value={optionKey}
                    onChange={() => handleOptionChange(item.question_id, optionKey)}
                    checked={responses[item.question_id] === optionKey}
                  />
                  <label htmlFor={`option-${item.question_id}-${optionKey}`} className="ml-2">
                    {optionValue} {/* Explicitly type optionValue as string */}
                  </label>
                </li>
              ))}
            </ul>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="test-container p-4"> {/* Add padding to the test container */}
      <h1 className="text-center text-2xl mb-4">Math Test</h1>
      <div>
        <label htmlFor="address">Your Address:</label>
        <input type="text" id="address" value={userAddress} onChange={handleAddressChange} />
      </div>
      <div>{splitIntoTiles(math)}</div>
      <button onClick={handleSubmit} className="btn bg-blue-500 text-white hover:bg-blue-700 mt-4">
        Submit
      </button>
    </div>
  );
};

export default MathTest;

'use client'

import React, { useContext, useState } from 'react';
import { math } from '../../mathtest.json';
import { useAccount } from "wagmi";
import { TestEvaluationContext } from '~~/Context/TestEvaluation';

const MathTest = () => {

  const { address: connectedAddress } = useAccount();
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [userAddress, setUserAddress] = useState<string>('');

  const {submitResponse} = useContext(TestEvaluationContext)

  const handleOptionChange = (questionId: number, optionId: string) => {
    setResponses({ ...responses, [questionId]: optionId });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAddress(event.target.value);
  };

// the data that will be submitted in response
const handleSubmit = () => {
  // Check if the user has provided their address
  if (connectedAddress == undefined) {
      alert('Please provide your address.');
      return;
  }

  // Prepare the data to be submitted
  const submittedData = Object.entries(responses).map(([questionId, optionId]) => {
      const questionData = math.find(item => item.question_id === parseInt(questionId));
      if (questionData) {
          const optionIndex = Object.keys(questionData.options).findIndex(key => key === optionId);
          return {
              questionId: parseInt(questionId),
              optionIndex,
              connectedAddress // Add the user's address
          };
      }
      return null;
  }).filter(Boolean);

  console.log('Submitted Data:', submittedData); // Add this line to log the submitted data

  // Pass responses to submitResponse instead of submittedData
  submitResponse(responses);

  // Do something with the submittedData, such as sending it to the server or processing it
  console.log('Submitted Data:', submittedData);
};


  // Function to split the math test content into individual tiles
  const splitIntoTiles = (mathTest: any[]): JSX.Element[] => {
    const tiles: JSX.Element[] = [];
    let currentTileContent: any[] = [];
    let currentQuestionId: number | null = null;

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
  const renderTile = (tileContent: any[]) => {
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
                    {optionValue as string} {/* Explicitly type optionValue as string */}
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

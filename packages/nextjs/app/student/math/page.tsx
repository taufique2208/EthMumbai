'use client'

import React from 'react';
import {math} from '../../mathtest.json'



const MathTest = () => {

  
  return (
    <div className="test-container">
      <h1 className="text-center text-2xl mb-4">Math Test</h1>
      <ul className="list-none p-0">
        {math?.map((question) => (
          <li key={question.question_id} className="mb-8">
            <p className="font-medium">Question {question.question_id}</p>
            <p className="mb-2">{question.question}</p>
            <ul className="list-none p-0 mb-4">
              {Object.entries(question.options).map(([optionKey, optionValue]) => (
                <li key={optionKey} className="flex items-center mb-1">
                  <span className="mr-2 font-medium">{optionKey.toUpperCase()}:</span>
                  <span>{optionValue}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MathTest;

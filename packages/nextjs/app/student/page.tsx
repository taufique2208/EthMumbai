'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {math} from '../mathtest.json';
import MathTest from './math/page.jsx';

interface MathQuestion {
  question_id: number;
  question: string;
  options: {
    [key: string]: string;
  };
  correctOption: number;
}


const StudentTestPage = () => {
  const [mathTestData, setMathTestData] = useState<MathQuestion[]>();

  const tests = [
    {
      name: 'Math Quiz',
      duration: '30 minutes',
      totalMarks: 50,
    },
    {
      name: 'English Essay',
      duration: '30 mins',
      totalMarks: 50,
    },
    {
      name: 'Science Experiment',
      duration: '30 minutes',
      totalMarks: 50,
    },
  ];

  const router = useRouter();

  const handleTakeMathTestClick = async () => {
    // Fetch or load the math test data (e.g., from mathTest.json)
    // console.log(math);
    setMathTestData(math);
    console.log(mathTestData);

    // Navigate to the student screen
    router.push('/student/math');
  };

  const handleTakeTestClick = () => {
    router.push('/student'); // Navigate to the student screen
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div
            key={test.name}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-medium mb-2">{test.name}</h3>
            <p>
              <span className="font-bold mr-2">Duration:</span>
              {test.duration}
            </p>
            <p>
              <span className="font-bold mr-2">Total Marks:</span>
              {test.totalMarks}
            </p>
            
              <button onClick={handleTakeMathTestClick} className="btn mt-4 bg-blue-500 text-white hover:bg-blue-700">
                Take Test
              </button>
            
          </div>
        ))}
      </div>
      {mathTestData && <MathTest />} {/* Render MathTest if data available */}
    </div>
  );
};

export default StudentTestPage;

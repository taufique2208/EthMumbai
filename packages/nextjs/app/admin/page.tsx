'use-client'

import { useRouter } from 'next/router';
import React from 'react';

const AdminPage = () => {
  const tests = [
    {
      name: 'Math Quiz',
      duration: '30 minutes',
      totalMarks: 50,
    },
    {
      name: 'English Essay',
      duration: '1 hour',
      totalMarks: 100,
    },
    {
      name: 'Science Experiment',
      duration: '45 minutes',
      totalMarks: 75,
    },
  ];

  const router = useRouter();

  // const handleTakeTestClick = () => {
  //   router.push('/admin'); // Navigate to the student screen
  // };

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
            <button className="btn mt-4 bg-blue-500 text-white hover:bg-blue-700">
              Take Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;

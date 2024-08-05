import React from 'react';

const TopicsVisual = ({ topicsWithSentiments }) => {
  // Extract positive and negative topics
  const positiveTopics = Object.entries(topicsWithSentiments.positive)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const negativeTopics = Object.entries(topicsWithSentiments.negative)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white p-4 m-2 rounded-lg text-left flex flex-col items-left">
      <h2 className="text-xl font-semibold mb-4">What users are saying</h2>
      <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
        <div className="positive-topics flex-1 mb-8 lg:mb-0">
          <h3 className="text-lg font-semibold mb-2">Positive Topics <span role="img" aria-label="thumbs up">👍</span></h3>
          {positiveTopics.map(([topic, percentage], index) => (
            <div key={index} className="topic-item bg-gray-200 rounded px-4 py-2 mb-2 flex justify-between items-center">
              <span>{topic}</span>
              <span className="text-green-600 font-semibold">{percentage}%</span>
            </div>
          ))}
          <p className="text-sm mt-2">Percentage of comments that mentioned the topic <span className="text-green-600">positively</span></p>
        </div>
        <div className="negative-topics flex-1">
          <h3 className="text-lg font-semibold mb-2">Negative Topics <span role="img" aria-label="thumbs down">👎</span></h3>
          {negativeTopics.map(([topic, percentage], index) => (
            <div key={index} className="topic-item bg-gray-200 rounded px-4 py-2 mb-2 flex justify-between items-center">
              <span>{topic}</span>
              <span className="text-red-600 font-semibold">{percentage}%</span>
            </div>
          ))}
          <p className="text-sm mt-2">Percentage of comments that mentioned the topic <span className="text-red-600">negatively</span></p>
        </div>
      </div>
    </div>
  );
};

export default TopicsVisual;

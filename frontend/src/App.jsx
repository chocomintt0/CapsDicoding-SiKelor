import React from 'react';
import ImageClassifier from './components/ImageClassifier';
import ObjectDetector from './components/ObjectDetector';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <ImageClassifier />
      <ObjectDetector />
    </div>
  );
}

export default App;

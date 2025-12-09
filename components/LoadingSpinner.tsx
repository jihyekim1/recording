import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p className="ml-3 text-indigo-600">처리 중...</p>
    </div>
  );
};

export default LoadingSpinner;
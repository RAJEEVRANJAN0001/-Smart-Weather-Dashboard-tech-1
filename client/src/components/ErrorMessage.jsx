import React from 'react';

function ErrorMessage({ message, onRetry, onBack }) {
  return (
    <div className="glass-card p-8 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-red-400">
        Something went wrong
      </h3>
      
      <p className="text-slate-300 mb-6">
        {message}
      </p>
      
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary"
          >
            Try Again
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="btn-secondary"
          >
            Change Location
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;

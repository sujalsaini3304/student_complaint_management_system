import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 shadow-md">
      <CheckCircleIcon className="h-12 w-12 text-green-600 mb-3" />
      <h2 className="text-xl font-semibold">Complaint Registered Successfully!</h2>
      <p className="text-sm mt-1">We have received your complaint and will get back to you shortly.</p>
    </div>
  );
};

export default SuccessMessage;

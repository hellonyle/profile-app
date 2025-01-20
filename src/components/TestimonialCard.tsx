'use client';

import { FC } from 'react';

type TestimonialCardProps = {
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
  isRevealed: boolean;
  onReveal: () => void;
};

const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial, isRevealed, onReveal }) => {
  return (
    <div 
      onClick={!isRevealed ? onReveal : undefined}
      className={`
        relative rounded-xl shadow-lg 
        transition-all duration-700 ease-in-out
        ${!isRevealed ? 'cursor-pointer hover:scale-105 bg-gray-900' : 'bg-white'}
        min-h-[200px]
      `}
    >
      {!isRevealed ? (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl text-blue-500">?</span>
            </div>
            <p className="text-lg font-semibold text-blue-500">Click to reveal</p>
            <p className="text-sm text-gray-400">Discover who is behind this testimonial</p>
          </div>
        </div>
      ) : (
        <div className="p-6 h-full flex flex-col justify-between">
          <p className="text-gray-700 text-lg font-medium mb-4 italic leading-relaxed">
            "{testimonial.text}"
          </p>
          <div className="mt-auto">
            <p className="font-bold text-xl text-gray-900">{testimonial.author}</p>
            <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
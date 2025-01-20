'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
// Fügen Sie diese Klassen zur Card hinzu für sanftere Übergänge
<Card className="w-full max-w-4xl relative bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-500 ease-in-out"></Card>
export { Card, CardContent };

interface TestimonialCardProps {
  testimonial: {
    text: string;
    author: string;
    role: string;
    image: string;
  };
  isRevealed: boolean;
  onReveal: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isRevealed, onReveal }) => {
  return (
    <div 
      onClick={!isRevealed ? onReveal : undefined}
      className={`
        relative overflow-hidden rounded-xl shadow-lg 
        transition-all duration-700 ease-in-out 
        ${!isRevealed ? 'cursor-pointer hover:scale-105' : 'scale-100'}
      `}
    >
      <div className="aspect-square relative">
        <img 
          src={testimonial.image} 
          alt={isRevealed ? testimonial.author : "Mystery testimonial"}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${isRevealed ? 'blur-0' : 'blur-md scale-110'}
          `}
        />
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
          transition-opacity duration-700
          ${isRevealed ? 'opacity-100' : 'opacity-70'}
        `} />
        
        <div className={`
          absolute inset-0 p-6 flex flex-col justify-end
          transform transition-all duration-700
          ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <p className="text-white mb-4 italic">"{testimonial.text}"</p>
          <div className="text-white">
            <p className="font-bold">{testimonial.author}</p>
            <p className="text-sm opacity-80">{testimonial.role}</p>
          </div>
        </div>

        {!isRevealed && (
          <div className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-500
            ${isRevealed ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="text-center text-white p-6">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">?</span>
              </div>
              <p className="text-lg font-semibold">Click to reveal</p>
              <p className="text-sm opacity-80">Discover who's behind this testimonial</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
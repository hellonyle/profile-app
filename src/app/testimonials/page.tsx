'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Image from 'next/image';

type Testimonial = {
  text: string;
  author: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Working with Lennart has always been a pleasure. His ability to combine knowledge from different areas, especially in automation and AI, consistently inspires. His energy and resourcefulness make every collaboration both productive and highly enjoyable.",
    author: "Pia Linden",
    role: "Design Thinking Coach & Facilitator at Deloitte",
    image: "/images/testimonial1.jpg"
  },
  {
    text: "Lennart brings an impressively broad knowledge in entrepreneurship, innovation, and organizational development. His pragmatic approach, coupled with strategic vision, has been invaluable in optimizing our processes and integrating AI tools into our daily operations.",
    author: "Philipp Rier",
    role: "CEO Lia Collective",
    image: "/images/testimonial2.jpg"
  },
  {
    text: "What I particularly value about Lennart is his contagious enthusiasm and ability to question dynamics, implement changes, and turn them into playful routines. His curiosity is remarkable - whenever something interests him, he dedicates himself completely until he has mastered it.",
    author: "Johannes Franke",
    role: "Architect & Design Thinking Coach",
    image: "/images/testimonial3.jpg"
  },
  {
    text: "Working with Lennart is a delight. His boundless creativity is matched only by his enthusiasm for topics that interest him. He consistently brings unique value to every team, always has relevant methods at hand, and can be relied upon 100% to deliver excellence.",
    author: "Charlotte Streit",
    role: "CEO Hotel Ora & Amore",
    image: "/images/testimonial4.jpg"
  }
];

const TestimonialsPage = () => {
  const [revealedTestimonials, setRevealedTestimonials] = useState<boolean[]>(new Array(testimonials.length).fill(false));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Button>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Testimonials</h1>
          </div>
          <p className="text-xl text-gray-600">What others say about me</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => {
                const newRevealed = [...revealedTestimonials];
                newRevealed[index] = true;
                setRevealedTestimonials(newRevealed);
              }}
              className={`
                relative rounded-xl shadow-lg p-8
                transition-all duration-700 ease-in-out
                ${!revealedTestimonials[index] ? 'cursor-pointer hover:scale-105 bg-gray-900' : 'bg-white'}
                min-h-[300px] flex flex-col
              `}
            >
              {!revealedTestimonials[index] ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center mb-4 mx-auto">
                      <span className="text-3xl text-blue-500">?</span>
                    </div>
                    <p className="text-xl font-semibold text-blue-500">Click to reveal</p>
                    <p className="text-sm text-gray-400 mt-2">Discover who&apos;s behind this testimonial</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{testimonial.author}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg italic leading-relaxed flex-grow">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
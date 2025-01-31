'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Users, 
  Briefcase, 
  Star, 
  MessageCircle 
} from "lucide-react";

type Trait = {
  label: string;
  value: number;
};

type Testimonial = {
  text: string;
  author: string;
  role: string;
  image?: string;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  background: string;
  icon: React.ElementType;
  traits?: Trait[];
  bullets?: string[];
  testimonials?: Testimonial[];
};

const sections: Section[] = [
  {
    id: 'welcome',
    title: "Welcome",
    subtitle: "Lets explore my profile together",
    content: "Hi, I am Lennart and excited to show you how I could contribute to Campus Founders as a Program Manager. I bring a unique blend of innovation, coaching experience, and entrepreneurial spirit.",
    image: "/images/welcome.jpg",
    background: "/images/bg-welcome.jpg",
    icon: Heart
  },
  {
    id: 'personality',
    title: "My Personality",
    subtitle: "ENFP (The Campaigner)",
    content: "As an ENFP, I bring vibrant enthusiasm and creativity to everything I do. My natural ability to connect people and ideas makes me an effective bridge-builder in dynamic environments.",
    traits: [
      { label: "Extraverted", value: 60 },
      { label: "Intuitive", value: 76 },
      { label: "Feeling", value: 79 },
      { label: "Prospecting", value: 85 },
      { label: "Assertive", value: 82 }
    ],
    image: "/images/personality.jpg",
    background: "/images/bg-personality.jpg",
    icon: Heart
  },
  {
    id: 'values',
    title: "My Core Values",
    subtitle: "What drives me forward",
    content: "My approach to work and life is shaped by strong core values that align perfectly with the entrepreneurial spirit of Campus Founders:",
    bullets: [
      "Fostering Innovation & Entrepreneurship",
      "Building Meaningful Connections",
      "Driving Positive Impact",
      "Continuous Learning & Growth"
    ],
    image: "/images/values.jpg",
    background: "/images/bg-values.jpg",
    icon: Star
  },
  {
    id: 'team',
    title: "My Role in Teams",
    subtitle: "How I contribute to team success",
    content: "In the dynamic startup ecosystem of Campus Founders, I would contribute by:",
    bullets: [
      "Connecting talents with opportunities",
      "Facilitating growth and learning",
      "Creating engaging program experiences",
      "Building strong community relationships"
    ],
    image: "/images/team.jpg",
    background: "/images/bg-team.jpg",
    icon: Users
  },
  {
    id: 'environment',
    title: "Ideal Work Environment",
    subtitle: "Where I thrive",
    content: "The entrepreneurial and innovative environment at Campus Founders matches perfectly with where I perform best:",
    bullets: [
      "Dynamic startup ecosystem",
      "Focus on learning and growth",
      "Collaborative community",
      "Impact-driven culture"
    ],
    image: "/images/environment.jpg",
    background: "/images/bg-environment.jpg",
    icon: Briefcase
  },
  {
    id: 'experience',
    title: "Key Experiences",
    subtitle: "My professional journey",
    content: "My experience has prepared me well for the Program Manager role:",
    bullets: [
      "Head of Product & Innovation at vonMorgen",
      "Startup Coach & Trainer",
      "Design Thinking Facilitator",
      "AI Implementation Specialist"
    ],
    image: "/images/experience.jpg",
    background: "/images/bg-experience.jpg",
    icon: Briefcase
  }
];

export const ProfileApp: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  const progress = ((currentSection + 1) / sections.length) * 100;

  const nextSection = useCallback(() => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(curr => curr + 1);
    }
  }, [currentSection, sections.length]);

  const prevSection = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection(curr => curr - 1);
    }
  }, [currentSection]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSection, prevSection]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentSection]);

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm transition-all duration-500">
          <CardContent className="p-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to My Profile</h1>
            <p className="text-lg text-gray-600 mb-8">Let&apos;s explore how I could contribute to Campus Founders</p>
            <Button 
              onClick={() => setIsStarted(true)}
              className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                text-white px-8 py-4 rounded-lg text-lg transition-all duration-500 transform hover:scale-105
                opacity-100`}
            >
              Start Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentContent = sections[currentSection];
  const Icon = currentContent.icon;

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-4 transition-all duration-500"
      style={{
        backgroundImage: `url(${currentContent.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-white/30" />
      
      <Card className="w-full max-w-4xl relative bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-500 ease-in-out">
        <CardContent className="p-6">
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-opacity-20" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Step {currentSection + 1} of {sections.length}</span>
              <span>{currentContent.title}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <div className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                  {currentContent.title}
                </h2>
              </div>
              
              <h3 className="text-xl text-blue-600 font-semibold">
                {currentContent.subtitle}
              </h3>
              
              <p className="text-lg text-gray-600">
                {currentContent.content}
              </p>

              {currentContent.bullets && (
                <ul className="space-y-2">
                  {currentContent.bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 hover:translate-x-2 transition-all duration-300 cursor-default"
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {currentContent.traits && (
                <div className="space-y-3">
                  {currentContent.traits.map((trait, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{trait.label}</span>
                        <span>{trait.value}%</span>
                      </div>
                      <Progress 
                        value={trait.value} 
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="order-1 md:order-2 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
              )}
              <Image
                src={currentContent.image}
                alt={currentContent.title}
                width={800}
                height={600}
                className={`w-full rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              onClick={prevSection}
              disabled={currentSection === 0}
              variant="outline"
              className="flex items-center gap-2 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className="flex items-center gap-2 transition-all duration-300"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-6">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-600 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {currentSection < sections.length - 1 && (
            <div className="absolute -bottom-4 right-4 text-sm text-gray-500 bg-white/90 px-2 py-1 rounded">
              <span>Next: {sections[currentSection + 1].title}</span>
            </div>
          )}

          {currentSection === sections.length - 1 && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => window.location.href = '/testimonials'}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                View Testimonials
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="md:hidden mt-4 text-center text-gray-500 animate-bounce">
        <span className="text-sm">Scroll for more</span>
      </div>
    </div>
  );
};

export default ProfileApp;

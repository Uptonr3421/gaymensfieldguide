"use client";
import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

export function UnsubscribeMaze() {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Manage your plan");
  const [showConfetti, setShowConfetti] = useState(false);

  const next = (path: 'stay' | 'leave') => {
    if (path === 'stay') {
        setStep(0);
        setMessage("Great choice! We added 5GB to your account.");
    } else {
        if (step === 3) {
            setMessage("Error: Please contact support to cancel (Wait time: 485 mins).");
            return;
        }
        setStep(s => s + 1);
    }
  };

  const content = [
    {
        title: "Are you sure?",
        body: "If you leave now, you lose your 'Loyalty Badge' and your data will be archived for 30 days before deletion.",
        primary: "Keep My Badge",
        secondary: "Continue to Cancel"
    },
    {
        title: "Wait! 50% Off?",
        body: "We can lower your bill to $9.99/mo right now. Just click the button below.",
        primary: "Claim 50% Off",
        secondary: "No thanks, I hate savings"
    },
    {
        title: "Why are you leaving?",
        body: "Please write a 500-character essay on how we failed you.",
        primary: "I'll stay",
        secondary: "Skip & Cancel"
    },
    {
        title: "Confirm Cancellation",
        body: "To confirm, please type 'I ACKNOWLEDGE I AM MAKING A MISTAKE' below.",
        primary: "Nevermind",
        secondary: "Confirm"
    }
  ];

  return (
    <InteractiveContainer title="DARK_PATTERN_SIM_v4" type="game">
      <div className="font-sans text-sm p-6 bg-white text-black rounded relative overflow-hidden">
        {step < 3 ? (
             <>
                <h3 className="text-xl font-bold mb-2">{content[step].title}</h3>
                <p className="text-gray-600 mb-6">{content[step].body}</p>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => next('stay')}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 shadow-lg"
                    >
                        {content[step].primary}
                    </button>
                    <button 
                        onClick={() => next('leave')}
                        className="w-full text-gray-400 text-xs hover:text-gray-600 underline"
                    >
                        {content[step].secondary}
                    </button>
                </div>
             </>
        ) : (
            <div className="text-center py-8">
                <div className="text-red-600 font-bold mb-4 animate-bounce">
                    ERROR 503: UNABLE_TO_PROCESS
                </div>
                <p className="text-gray-600 mb-4">
                    Our cancellation server is currently "undergoing maintenance." 
                    Please try again between 3:00 AM and 3:01 AM on a Tuesday.
                </p>
                <button onClick={() => setStep(0)} className="text-blue-600 underline">
                    Back to Safety
                </button>
            </div>
        )}
        
        <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1">
            SIMULATION_MODE
        </div>
      </div>
    </InteractiveContainer>
  );
}

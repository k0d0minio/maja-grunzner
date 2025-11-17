"use client";

import React, { useState, useRef, useEffect } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-5 px-0 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-2 rounded"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${question.slice(0, 10)}`}
      >
        <span className="text-lg font-medium text-gray-900 pr-4">
          {question}
        </span>
        <svg
          className={`w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={`accordion-content-${question.slice(0, 10)}`}
        ref={contentRef}
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
        aria-hidden={!isOpen}
      >
        <div className="pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ question: string; answer: string }>;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.has(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}


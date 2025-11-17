"use client";

import React, { useEffect, useRef, useState } from "react";
import { content } from "../lib/content";
import Button from "./Button";

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.process.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {content.process.steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#4a90e2] text-white rounded-full text-2xl font-bold mb-6">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => {
              const element = document.querySelector("#hero");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Start your journey
          </Button>
        </div>
      </div>
    </section>
  );
}


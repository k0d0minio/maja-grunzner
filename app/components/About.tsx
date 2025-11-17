"use client";

import React, { useEffect, useRef, useState } from "react";
import { content } from "../lib/content";
import Button from "./Button";
import ImageWithFallback from "./ImageWithFallback";

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feeling stuck section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.about.intro.question}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            {content.about.intro.subquestion}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#4a90e2]">
            {content.about.intro.reassurance}
          </p>
        </div>

        {/* Introduction card */}
        <div
          className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="/images/maja-profile.jpg"
                  alt={`${content.name} - ${content.title}`}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  fallbackSrc="https://via.placeholder.com/256"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Hi, I'm {content.name}
              </h3>
              <p className="text-xl text-[#4a90e2] font-semibold mb-4">
                {content.title}, {content.credentials}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {content.about.bio}
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  const element = document.querySelector("#services");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Know More About Me
              </Button>
            </div>
          </div>
        </div>

        {/* Areas of help grid */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Areas I can help you with
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.about.areasOfHelp.map((area, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-[#4a90e2] hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <p className="text-lg font-semibold text-gray-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


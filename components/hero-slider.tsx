"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[600px] rounded-lg overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0 scale-100"
              : direction > 0
              ? "opacity-0 -translate-x-full scale-95"
              : "opacity-0 translate-x-full scale-95"
          }`}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-in-out">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-fit transform transition-transform duration-700 ease-in-out group-hover:scale-105"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white transition-all duration-700 ease-in-out transform">
              <h1 
                className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-500 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-xl mb-6 transition-all duration-500 delay-100 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {slide.description}
              </p>
              <Link href={slide.buttonLink}>
                <Button 
                  className={`bg-[#027046] hover:bg-[#025a38] transition-all duration-500 delay-200 transform hover:scale-105 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#027046] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#027046] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 rounded-full transform hover:scale-110 ${
              index === currentSlide
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
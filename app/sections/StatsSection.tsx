"use client";
import { useState, useEffect, useRef } from "react";

// Custom hook for count-up animation
const useCountUp = (
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
};

export default function StatsSection() {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isStatsVisible]);

  // Count-up values
  const customersCount = useCountUp(30, 2000, isStatsVisible);
  const shipmentsCount = useCountUp(2.5, 2000, isStatsVisible);
  const partnersCount = useCountUp(400, 2500, isStatsVisible);
  const citiesCount = useCountUp(550, 3000, isStatsVisible);

  return (
    <section className="py-16 bg-white" ref={statsRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#1F447B] mb-4">
              {customersCount}K
            </div>
            <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
              Happy Customers
            </h3>
            <p className="text-[#324A6D] leading-relaxed">
              Businesses worldwide trust our shipping solutions for their
              logistics needs
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#1F447B] mb-4">
              {shipmentsCount}K
            </div>
            <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
              Daily Shipments
            </h3>
            <p className="text-[#324A6D] leading-relaxed">
              Packages processed and delivered through our platform every single
              day
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#1F447B] mb-4">
              {partnersCount}
            </div>
            <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
              Global Partners
            </h3>
            <p className="text-[#324A6D] leading-relaxed">
              Carrier partnerships and integrations to serve your shipping needs
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#1F447B] mb-4">
              {citiesCount}
            </div>
            <h3 className="text-xl font-semibold text-[#1F447B] mb-2">
              Cities Covered
            </h3>
            <p className="text-[#324A6D] leading-relaxed">
              Major destinations worldwide with reliable delivery coverage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

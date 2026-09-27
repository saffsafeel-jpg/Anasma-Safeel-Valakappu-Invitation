import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CountdownTime } from '../types';

export const LiveCountdown: React.FC = () => {
  // Wedding Date: September 21, 2026, 10:00:00 (10:00 AM)
  const targetDate = new Date('2026-09-21T10:00:00');

  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section 
      id="countdown-section"
      className="relative w-full py-12 px-5 bg-[#FAF0F2] text-[#581825] flex flex-col items-center text-center overflow-hidden border-y border-[#E8CCD1]/60"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[380px]"
      >
        {/* Title seen in video: "The Celebration Begins In" in cursive */}
        <h3 className="font-script text-2xl sm:text-3xl text-[#581825] mb-6">
          The Celebration Begins In
        </h3>

        {/* Minimalist, luxurious grid timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: 'Days', value: formatNumber(timeLeft.days) },
            { label: 'Hours', value: formatNumber(timeLeft.hours) },
            { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
            { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-[#FFFDF9] rounded-xl p-2.5 sm:p-3 border border-[#E8CCD1] shadow-sm relative group hover:border-[#C5A059] transition-colors"
            >
              {/* Inner subtle gold top line */}
              <div className="absolute top-0 inset-x-3 h-0.5 bg-[#C5A059]/40 rounded-full" />
              
              <span className="font-serif text-2xl sm:text-3xl font-light text-[#581825] tracking-tight leading-none mt-1">
                {item.value}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-serif text-[#C5A059] font-medium mt-1.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-serif italic text-xs text-[#6B1D2F]/70 tracking-wider mt-5">
          Monday, September 21st, 2026 • Insha&apos;Allah
        </p>
      </motion.div>
    </section>
  );
};

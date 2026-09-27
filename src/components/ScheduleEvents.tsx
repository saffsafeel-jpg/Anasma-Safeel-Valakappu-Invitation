import React from 'react';
import { motion } from 'motion/react';

export const ScheduleEvents: React.FC = () => {
  const events = [
    {
      time: '10:00 AM',
      period: 'Morning',
      title: 'Guest Arrival',
      subtitle: 'Welcome refreshments & seating',
    },
    {
      time: '11:00 AM',
      period: 'Morning',
      title: 'Nikkah Ceremony',
      subtitle: 'Sacred marriage vows, Khutbah & Duas',
    }
  ];

  return (
    <section 
      id="schedule-section"
      className="relative w-full py-16 px-5 bg-gradient-to-b from-[#FAF0F2] via-[#FFFDF9] to-[#FAF0F2] text-[#581825] flex flex-col items-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="font-serif italic text-xs tracking-[0.25em] uppercase text-[#C5A059]">
          Order of the Day
        </p>
        <h3 className="font-script text-3xl sm:text-4xl text-[#581825] mt-1">
          Schedule of Events
        </h3>
        <div className="w-16 h-px bg-[#C5A059]/50 mx-auto mt-2" />
      </motion.div>

      {/* Vertical Timeline container with delicate dotted line & rosebud checkpoint nodes */}
      <div className="relative w-full max-w-[370px] mx-auto">
        
        {/* Continuous Center Dotted Line */}
        <div className="absolute left-[38%] top-4 bottom-4 w-px border-l-2 border-dotted border-[#C5A059]/60 -translate-x-1/2 pointer-events-none" />

        <div className="space-y-10">
          {events.map((event, index) => (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative flex items-center justify-between group"
            >
              {/* Left Side: Time */}
              <div className="w-[32%] text-right pr-4">
                <span className="font-serif text-base sm:text-lg font-medium text-[#581825] tracking-wide block">
                  {event.time.replace(':00', '')}
                </span>
                <span className="text-[10px] uppercase font-serif text-[#C5A059] tracking-widest">
                  {event.period}
                </span>
              </div>

              {/* Center Node: Delicate Rosebud Checkpoint */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#C5A059] shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FAF0F2] transition-transform duration-300">
                  {/* Miniature Rosebud Icon */}
                  <div className="w-5 h-5 rounded-full bg-[#F3B8BF]/40 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6B1D2F]" />
                  </div>
                </div>
              </div>

              {/* Right Side: Event Details */}
              <div className="w-[56%] pl-4 text-left">
                <h4 className="font-serif text-base sm:text-lg font-medium text-[#581825] leading-tight">
                  {event.title}
                </h4>
                <p className="text-xs text-[#6B1D2F]/75 font-sans mt-0.5 leading-snug">
                  {event.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { GlassWater, Sparkles, Camera, Utensils, Clock } from 'lucide-react';

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

export const ValakappuProgramTimeline: React.FC = () => {
  const events: TimelineItem[] = [
    {
      id: 'welcome',
      time: '03:00 PM',
      title: 'Warm Welcome & Arrival',
      description: 'Gathering of family and friends with refreshing welcome drinks.',
      icon: <GlassWater className="w-4 h-4 text-[#D4AF37]" />,
      accent: 'from-[#D4AF37] to-[#FFF3B0]',
    },
    {
      id: 'rituals',
      time: '03:30 PM',
      title: 'Traditional Valakappu Rituals',
      description: 'Bangle ceremony, traditional prayers, and blessings for mother and baby.',
      icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" />,
      accent: 'from-[#FFF3B0] to-[#E5C378]',
    },
    {
      id: 'photos',
      time: '04:45 PM',
      title: 'Photo Session & Felicitations',
      description: 'Capturing joyful memories and warm blessings with loved ones.',
      icon: <Camera className="w-4 h-4 text-[#D4AF37]" />,
      accent: 'from-[#E5C378] to-[#D4AF37]',
    },
    {
      id: 'feast',
      time: '05:30 PM – 06:00 PM',
      title: 'Evening Refreshments & Dinner Feast',
      description: 'Delicious spread of traditional delicacies and festive treats.',
      icon: <Utensils className="w-4 h-4 text-[#D4AF37]" />,
      accent: 'from-[#D4AF37] to-[#AA7C11]',
    },
  ];

  return (
    <section id="program-timeline" className="relative w-full py-12 px-6 bg-gradient-to-b from-[#0A101C] via-[#0E172E] to-[#121B2F] text-[#FAF8F5]">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#1A2C54]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            <span>03:00 PM to 06:00 PM</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
            Program Timeline
          </h2>
          <p className="font-montserrat text-xs text-[#FAF8F5]/70 tracking-wider uppercase font-light">
            Sunday, 04th October 2026 · 03:00 PM to 06:00 PM
          </p>
        </div>

        {/* Sequential Timeline breakdown */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[1.5px] before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#E5C378]/50 before:to-[#D4AF37]">
          {events.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative group"
            >
              {/* Subtle line icon node */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0E172E] border border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)] flex items-center justify-center transition-transform group-hover:scale-110">
                {item.icon}
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-2xl bg-[#142038]/80 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md text-left">
                {/* Time Badge */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                    {item.time}
                  </span>
                  <span className="text-[10px] font-montserrat text-[#FAF8F5]/40 tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5] leading-snug group-hover:text-[#FFF3B0] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-montserrat text-xs text-[#FAF8F5]/75 mt-1 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Traditional Blessing Note */}
        <div className="pt-2 text-center">
          <p className="font-serif italic text-xs text-[#D4AF37]/90 tracking-wide">
            ✦ All rituals and ceremonies are accompanied by prayers &amp; melodious blessings ✦
          </p>
        </div>
      </div>
    </section>
  );
};

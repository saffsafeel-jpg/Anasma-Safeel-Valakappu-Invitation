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
      icon: <GlassWater className="w-4 h-4 text-[#D97D64]" />,
      accent: 'from-[#D97D64] to-[#E29578]',
    },
    {
      id: 'rituals',
      time: '03:30 PM',
      title: 'Traditional Valakappu Rituals',
      description: 'Bangle ceremony, traditional prayers, and blessings for mother and baby.',
      icon: <Sparkles className="w-4 h-4 text-[#D97D64]" />,
      accent: 'from-[#E29578] to-[#C59B27]',
    },
    {
      id: 'photos',
      time: '04:45 PM',
      title: 'Photo Session & Felicitations',
      description: 'Capturing joyful memories and warm blessings with loved ones.',
      icon: <Camera className="w-4 h-4 text-[#D97D64]" />,
      accent: 'from-[#C59B27] to-[#D97D64]',
    },
    {
      id: 'feast',
      time: '05:30 PM – 06:00 PM',
      title: 'Evening Refreshments & Dinner Feast',
      description: 'Delicious spread of traditional delicacies and festive treats.',
      icon: <Utensils className="w-4 h-4 text-[#D97D64]" />,
      accent: 'from-[#D97D64] to-[#9E4E38]',
    },
  ];

  return (
    <section id="program-timeline" className="relative w-full py-12 px-6 bg-gradient-to-b from-[#EFE4D6] via-[#FAF5EE] to-[#F5ECE0] text-[#2E1E14]">
      {/* Decorative ambient background (Aesthetic Pastel Glows) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[radial-gradient(circle,rgba(212,163,115,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C4E3A] text-[11px] font-cinzel tracking-widest uppercase font-semibold">
            <Clock className="w-3 h-3 text-[#D97D64]" />
            <span>03:00 PM to 06:00 PM</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl gold-gradient-text py-0.5">
            Program Timeline
          </h2>
          <p className="font-montserrat text-xs text-[#6E5448] tracking-wider uppercase font-medium">
            Sunday, 04th October 2026 · 03:00 PM to 06:00 PM
          </p>
        </div>

        {/* Sequential Timeline breakdown */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#D97D64] before:via-[#E29578] before:to-[#C59B27]">
          {events.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Event Circular Node Icon on the line */}
              <div className="absolute -left-[30px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#FAF5EE] border-2 border-[#D97D64] shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="w-2 h-2 rounded-full bg-[#D97D64]" />
              </div>

              {/* Event Details Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E8DACB] shadow-[0_4px_20px_rgba(80,50,30,0.06)] hover:border-[#D97D64]/50 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-[#8C4E3A] tracking-wider">
                    {item.time}
                  </span>
                  <div className="p-1.5 rounded-lg bg-[#FAF5EE] border border-[#E8DACB]">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#2E1E14]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5A4234] font-montserrat leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

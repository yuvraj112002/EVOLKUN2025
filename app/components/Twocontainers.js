'use client';

import { motion } from 'framer-motion';

export default function TwoContainers() {
  return (
    <section className="w-full py-20 bg-gray-800 text-white mt-20"> {/* Added `mt-20` */}
      {/* Section Title */}
      <div className="text-center mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl font-bold"
        >
          My Work & Experience
        </motion.h2>
      </div>

      {/* Two Containers Side-by-Side */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Container */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="p-10 bg-gray-700 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Creative Projects</h3>
          <p className="opacity-80">
            Explore some of the best projects I’ve worked on, from web apps to design showcases.
          </p>
        </motion.div>

        {/* Right Container */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="p-10 bg-gray-700 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Experience & Skills</h3>
          <p className="opacity-80">
            With years of experience in frontend and UX design, I craft seamless digital experiences.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

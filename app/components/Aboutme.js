'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <section className="relative w-full py-20 px-5 md:px-20 bg-[#f4f4ec]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side - Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/aboutimg.jpg"
            alt="aboutimg.jpg"
            width={600}
            height={400}
            className="rounded-lg w-full object-cover"
          />
        </motion.div>

        {/* Right Side - Text */}
        <motion.div
          className="w-full md:w-1/2 text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold text-black">ABOUT ME</h2>
          
          <h3 className="text-3xl font-bold italic mt-4">
            <span className="text-black">HI I'M, </span>
            <span className="text-black">YOUR NAME</span>
          </h3>

          <p className="text-lg mt-4 font-semibold text-black">
            I'm a passionate web developer with <span className="font-bold">X years of experience</span> creating unique digital experiences.
          </p>

          <p className="text-lg mt-4 text-black">
            My specializations include frontend development, UI/UX design, and animations. I love turning creative ideas into reality through design and coding.
          </p>
        </motion.div>
      </div>

      {/* Floating Decorative Shape */}
      <motion.div
        className="absolute bottom-5 right-10 w-20 h-20 bg-orange-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      />
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function AnimatedSection() {
  const shapesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      shapesRef.current,
      { y: -10, opacity: 0.7 },
      { y: 10, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-start px-10 md:px-32 text-white overflow-hidden">

      {/* Background Video (Ensure it stays in the background) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]" // z-[-1] ensures it stays behind
      >
        <source src="/bg-video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Floating Elements */}
      <div className="absolute top-10 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full z-10" ref={(el) => (shapesRef.current[0] = el)} />
      <div className="absolute top-1/2 left-10 w-8 h-8 bg-purple-500 rounded-full rotate-45 z-10" ref={(el) => (shapesRef.current[1] = el)} />
      <div className="absolute bottom-10 right-32 w-28 h-28 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full z-10" ref={(el) => (shapesRef.current[2] = el)} />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-pink-400 rounded-full z-10" ref={(el) => (shapesRef.current[3] = el)} />

      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-20" // Ensure the title is above the video
      >
        <h2 className="text-5xl font-bold">
          <motion.span
            className="bg-pink-300 text-black px-4 py-1 rounded-md"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Animate Anything
          </motion.span>
        </h2>
        <motion.p
          className="text-3xl font-semibold mt-3 bg-orange-500 inline-block px-4 py-1 rounded-md"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          That's right, Anything
        </motion.p>
      </motion.div>

      {/* Description */}
      <motion.p
        className="mt-6 text-lg max-w-2xl z-20" // Ensure the description is above the video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Whether you're animating UI, SVG, or creating immersive WebGL experiences, GSAP has your back.
      </motion.p>

    </section>
  );
}
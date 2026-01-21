"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, MapPin, Globe } from "lucide-react";
import Image from "next/image";

const skills = {
  "Languages & Frameworks": [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
  "E-Commerce & Shopify": [
    "Storefront API",
    "Liquid",
    "Custom Themes",
    "Headless Commerce",
    "Stripe",
  ],
  "Databases & APIs": [
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "REST APIs",
    "ShipEngine",
    "Socket.io",
  ],
  "Design Tools": [
    "Figma",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Framer Motion",
  ],
};

const experience = [
  {
    title: "Founder & Full-Stack Developer",
    company: "Cultivated Agency",
    location: "Los Angeles, CA",
    period: "2020 – Present",
    highlights: [
      "Build custom Shopify storefronts and headless e-commerce solutions using Storefront API, Liquid templating, and React/Next.js",
      "Develop full-stack web applications with Next.js, TypeScript, Prisma, and PostgreSQL",
      "Architect warehouse management systems with barcode scanning integration and real-time inventory tracking",
      "Integrate third-party services including Stripe, ShipEngine, Resend, and Cloudinary",
    ],
  },
  {
    title: "Graphic Designer & Web Developer",
    company: "XLanes LLC",
    location: "Los Angeles, CA",
    period: "2014 – 2020",
    highlights: [
      "Led design and development of brand websites, landing pages, and digital marketing assets",
      "Developed integrated marketing campaigns across web, print, and social media channels",
      "Created comprehensive branding systems including logos, style guides, and marketing collateral",
    ],
  },
  {
    title: "Jr Graphic Designer",
    company: "IMI Studio",
    location: "El Monte, CA",
    period: "2012 – 2014",
    highlights: [
      "Created visual assets for print and digital marketing materials",
      "Prepared production-ready files and coordinated with print vendors",
    ],
  },
];

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background moves slower (parallax effect)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Hero content fades and moves up as you scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);

  return (
    <main ref={containerRef} className="min-h-screen bg-neutral-900 relative">
      {/* Parallax Background Image */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image
          src="/la-city-line.jpg"
          alt="Los Angeles Skyline"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Hero Section with fade effect */}
      <motion.section
        className="relative z-10 min-h-[60vh] flex items-end"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="max-w-5xl mx-auto px-6 pb-24 pt-32 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
              >
                Tommy Vong
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/80"
              >
                Full-Stack Developer & Designer
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-3 text-sm text-white/70"
              >
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <MapPin className="w-4 h-4" />
                  Los Angeles, CA
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Mail className="w-4 h-4" />
                  Tommyvong88@gmail.com
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Globe className="w-4 h-4" />
                  tommyvong.com
                </span>
              </motion.div>
            </div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="/TommyVong-Resume-2025.pdf"
              download
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-medium hover:bg-white/90 transition w-fit shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Glassmorphic Resume Content */}
      <section className="relative z-10">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-2xl rounded-t-[3rem] border-t border-white/50 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]"
        >
          {/* Summary */}
          <div className="max-w-5xl mx-auto px-6 py-16">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-lg text-neutral-700 leading-relaxed max-w-3xl"
            >
              Full-stack developer with 10+ years of design experience,
              specializing in modern web applications and e-commerce solutions.
              Expert in React, Next.js, and TypeScript with deep experience
              building Shopify storefronts, custom themes, and headless commerce
              integrations.
            </motion.p>
          </div>

          {/* Skills */}
          <div className="bg-white/50 backdrop-blur-sm border-y border-white/30">
            <div className="max-w-5xl mx-auto px-6 py-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-8 text-neutral-900"
              >
                Technical Skills
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {category}
                    </h3>
                    <ul className="space-y-1.5">
                      {items.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm text-neutral-600 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="max-w-5xl mx-auto px-6 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-10 text-neutral-900"
            >
              Experience
            </motion.h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {job.title}
                      </h3>
                      <p className="text-neutral-600">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full w-fit">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white/50 backdrop-blur-sm border-t border-white/30">
            <div className="max-w-5xl mx-auto px-6 py-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-8 text-neutral-900"
              >
                Education
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      Bachelor of Fine Arts in Graphic Design
                    </h3>
                    <p className="text-neutral-600">
                      California State Polytechnic University, Pomona
                    </p>
                  </div>
                  <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full w-fit">
                    2007 – 2013
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-neutral-900 text-white">
            <div className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold"
              >
                Let's work together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral-400 max-w-xl mx-auto"
              >
                I'm currently available for freelance projects and full-time
                opportunities. Let's build something great.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="mailto:Tommyvong88@gmail.com"
                  className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-medium hover:bg-neutral-100 transition"
                >
                  <Mail className="w-5 h-5" />
                  Get in touch
                </a>
                <a
                  href="/TommyVong-Resume-2025.pdf"
                  download
                  className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-3 rounded-full font-medium hover:bg-neutral-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Trophy,
  Brain,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="px-8 md:px-20 py-20 text-center">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900"
        >
          Learn Smarter with <span className="text-blue-600">FunLearn</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          FunLearn empowers students and teachers with interactive quizzes,
          challenges, and tools designed to make learning engaging, effective,
          and fun.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-600 min-w-[30vw] text-white rounded-xl shadow hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 md:px-20 py-20 bg-white">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl font-bold text-center text-gray-900 mb-14"
        >
          Powerful Features for Modern Learning
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: BookOpen,
              title: "Interactive Quizzes",
              desc: "Engage with quizzes crafted by teachers for deep learning.",
            },
            {
              icon: Users,
              title: "Teacher-Student Collaboration",
              desc: "Seamless platform for communication and sharing resources.",
            },
            {
              icon: Trophy,
              title: "Gamified Learning",
              desc: "Earn badges, rewards, and track progress with fun incentives.",
            },
            {
              icon: Brain,
              title: "AI-Powered Insights",
              desc: "Smart analytics to personalize the learning journey.",
            },
            {
              icon: BarChart3,
              title: "Progress Tracking",
              desc: "Measure student performance with clear, insightful reports.",
            },
            {
              icon: CheckCircle2,
              title: "Easy to Use",
              desc: "Clean and simple design accessible to everyone.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-md transition"
            >
              <f.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Testimonials */}
      <section className="px-8 md:px-20 py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { number: "10K+", label: "Active Students" },
            { number: "1K+", label: "Teachers" },
            { number: "50K+", label: "Quizzes Solved" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-5xl font-extrabold">{stat.number}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Call-to-Action */}
      <footer className="px-8 md:px-20 py-16 text-center bg-white">
        <motion.h4
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Ready to Transform Learning?
        </motion.h4>
        <Link to="/login">
          <button initial="hidden" whileInView="visible" variants={fadeUp}>
            Get Started Today
          </button>
        </Link>

        <Link />
        <p className="mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} FunLearn. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

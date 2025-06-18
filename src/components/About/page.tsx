"use client";
import { useState } from "react";
import { montserrat } from "@/fonts/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar2 from "../Navbar/navbar2";

export default function AboutSection() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const team = [
    {
      name: "Yash Jewalkar",
      role: "Frontend Developer",
      img: "/yash-jewalkar.jpg", 
      linkedin: "https://www.linkedin.com/in/yash-jewalkar-203b56257",
      github: "https://github.com/Yash12169"
    },
    {
      name: "Yash Maurya",
      role: "Backend Engineer",
      img: "/yash-maurya.jpg",
      linkedin: "https://www.linkedin.com/in/yash-maurya-142136258",
      github: "https://github.com/yash-maurya23"
    },
  ];


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <> <Navbar2/>
    <section
      id="about"
      className="min-h-screen py-20 px-4 md:px-16 bg-gradient-to-b from-[#f0f8ff] to-[#e6f9f0]"
    >
      <div className="max-w-6xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${montserrat} text-4xl md:text-5xl font-bold mb-4 text-gray-800`}>
            About BudgetBuddy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your intelligent financial companion for smarter money management
          </p>
        </motion.div>

     
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Story</h3>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                BudgetBuddy was born from a simple idea: financial management shouldn&apos;t be complicated. 
                Founded in 2023, our platform combines cutting-edge technology with intuitive design to 
                help users of all financial backgrounds take control of their money.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We believe everyone deserves financial clarity without the jargon or hidden fees. 
                Whether you&apos;re saving for a dream vacation or paying off student loans, BudgetBuddy 
                provides the tools and insights you need to make informed financial decisions.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our journey began when our founders recognized the stress people face when managing 
                their finances. We&apos;ve since grown into a trusted platform helping thousands achieve 
                their financial goals through smart automation and personalized guidance.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800">Key Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-time Tracking",
                  desc: "Monitor expenses across all accounts in one place",
                  icon: "📊",
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  title: "Automated Budgets",
                  desc: "Smart budgets that adapt to your spending patterns",
                  icon: "🤖",
                  color: "bg-purple-100 text-purple-600"
                },
                {
                  title: "Savings Goals",
                  desc: "Customizable goals with progress tracking",
                  icon: "🎯",
                  color: "bg-green-100 text-green-600"
                },
                {
                  title: "AI Insights",
                  desc: "Personalized financial recommendations",
                  icon: "🧠",
                  color: "bg-yellow-100 text-yellow-600"
                },
                {
                  title: "Bank-level Security",
                  desc: "Your data is protected with encryption",
                  icon: "🔒",
                  color: "bg-red-100 text-red-600"
                },
                {
                  title: "Multi-device Sync",
                  desc: "Access your data anywhere, anytime",
                  icon: "🔄",
                  color: "bg-indigo-100 text-indigo-600"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission & Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group hover:bg-green-50/30"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-green-700 transition">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We&apos;re revolutionizing personal finance by making budgeting effortless and insightful. 
              Our mission is to empower 10 million people to achieve financial freedom by 2030.
            </p>
            <ul className="space-y-3">
              {[
                "Democratizing financial education",
                "Eliminating financial stress",
                "Building tools that adapt to your life",
                "Providing actionable insights",
                "Making finance accessible to all"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-3 text-gray-700 group-hover:text-gray-800 transition">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 group hover:bg-blue-50/30"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition">Why Choose Us?</h3>
            </div>
            <div className="space-y-5">
              {[
                {
                  title: "Smart Automation",
                  desc: "Our AI learns your spending habits to create personalized budgets that actually work.",
                  icon: "🤖",
                  color: "text-purple-500"
                },
                {
                  title: "No Hidden Fees",
                  desc: "What you see is what you get. No surprise charges or premium paywalls.",
                  icon: "💰",
                  color: "text-yellow-500"
                },
                {
                  title: "Privacy First",
                  desc: "Your data never gets sold. We use bank-level encryption to keep your information safe.",
                  icon: "🔒",
                  color: "text-green-500"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex group"
                >
                  <div className={`text-3xl mr-4 ${item.color} group-hover:scale-110 transition`}>{item.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">
            Meet Our Team
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl w-80 p-6 text-center transition duration-300 group hover:-translate-y-2 hover:bg-gray-50"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white shadow-md group-hover:border-green-300 transition-all">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-green-600 transition">
                  {member.name}
                </h4>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-5">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#0077b5] transition transform hover:scale-125"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-800 transition transform hover:scale-125"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto hover:shadow-3xl transition-shadow"
        >
          <h3 className="text-2xl font-semibold mb-2 text-center text-white">
            Get in Touch
          </h3>
          <p className="text-center text-white/80 mb-6">
            Have questions? We&apos;re here to help!
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition hover:bg-white/15"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition hover:bg-white/15"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition hover:bg-white/15"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition hover:bg-white/15"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
}
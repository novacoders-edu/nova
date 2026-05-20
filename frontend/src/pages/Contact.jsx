import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Mail, Phone, Clock, MessageSquare,
  Users, Zap, ChevronDown, ExternalLink,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import ContactFormSection from "../components/ContactFormSection";

/* ── FAQ data ── */
const faqs = [
  {
    q: "How quickly do you respond to messages?",
    a: "We typically reply within 24 hours on business days. For urgent matters, reach us directly on WhatsApp.",
  },
  {
    q: "Can I collaborate on a project with Nova Coders?",
    a: "Absolutely. We're always open to collaborations — whether it's a hackathon partnership, a community event, or a tech project. Drop us a message with your idea.",
  },
  {
    q: "How do I join the Nova Coders community?",
    a: "Click 'Join the Community' on the home page or reach out via WhatsApp. We welcome students and developers of all skill levels.",
  },
  {
    q: "Do you offer mentorship or workshops?",
    a: "Yes. We run regular workshops, seminars, and mentorship sessions. Follow our social channels to stay updated on upcoming events.",
  },
  {
    q: "Where are you based?",
    a: "We're based in Aligarh, Uttar Pradesh, India — but our community is fully online and open to everyone.",
  },
];

/* ── Contact info cards ── */
const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    value: "Aligarh, Uttar Pradesh, India",
    sub: "VIT Aligarh Campus",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Mail,
    label: "Email",
    value: "novacoder007@gmail.com",
    href: "mailto:novacoder007@gmail.com",
    sub: "For general inquiries",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 6397973513",
    href: "tel:+916397973513",
    sub: "Mon – Sat, 10 AM – 7 PM",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    sub: "On business days",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

/* ── Why reach out cards ── */
const reasons = [
  { icon: MessageSquare, title: "Project Collaboration", desc: "Partner with us on web, app, or AI projects." },
  { icon: Users, title: "Community & Events", desc: "Join hackathons, workshops, and seminars." },
  { icon: Zap, title: "Mentorship", desc: "Get guidance from experienced developers." },
];

/* ── FAQ item ── */
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-white/8 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white/3 hover:bg-white/6 transition-colors duration-200"
      >
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-cyan-400 flex-shrink-0 ml-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 py-4 text-gray-400 text-sm leading-relaxed border-t border-white/8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const { social } = useContext(DataContext);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden pt-28 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-cyan-300 text-sm font-medium mb-5"
        >
          <MessageSquare className="w-4 h-4" />
          Get In Touch
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-tight mb-4 max-w-3xl mx-auto"
        >
          Let's Build Something Together
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-xl mx-auto"
        >
          Whether you have a project idea, want to collaborate, or just want to say hi — we're always happy to hear from you.
        </motion.p>
      </div>

      {/* ── Info Cards ── */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map(({ icon: Icon, label, value, href, sub, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border p-5 ${bg} backdrop-blur-sm`}
            >
              <div className={`p-2 rounded-lg inline-flex mb-3 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
              {href ? (
                <a href={href} className={`text-sm font-semibold ${color} hover:underline break-all`}>
                  {value}
                </a>
              ) : (
                <p className={`text-sm font-semibold ${color}`}>{value}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Why Reach Out ── */}
      <div className="max-w-5xl mx-auto px-6 pb-14">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start bg-white/3 border border-white/8 rounded-xl p-5 hover:border-cyan-400/30 transition-colors duration-300"
            >
              <div className="p-2.5 bg-cyan-500/15 rounded-lg flex-shrink-0">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Contact Form Section ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <ContactFormSection />
      </div>

      {/* ── Social Links ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Find Us Online</h2>
          <p className="text-gray-400 text-sm">Follow along for updates, events, and community highlights.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {social.map(({ icon: Icon, url }, i) => (
            <motion.a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 text-gray-300 hover:text-white text-sm font-medium"
            >
              <Icon className="w-4 h-4" />
              <ExternalLink className="w-3 h-3 opacity-40" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Quick answers to common questions.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} {...faq} index={i} />
          ))}
        </div>
      </div>

    </div>
  );
}
